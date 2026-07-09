"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { parseEther, formatEther, isAddress } from "viem";
import { useBalance, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { ArrowUpRight, Check, Loader2, Zap } from "lucide-react";
import { POOL_TREASURY_ADDRESS, targetChain } from "@/lib/chains";
import { useEthPrice } from "@/hooks/useEthPrice";
import { recordContribution, getPoolContributionEth } from "@/lib/positions";
import { formatUsd } from "@/lib/data";

const QUICK_PICKS = ["0.05", "0.1", "0.25", "0.5"];
// Floor used only when the price feed is unavailable and the $-min can't
// be converted; roughly the $100 min entry at recent ETH prices.
const FALLBACK_MIN_ETH = 0.03;

function toReadableSendError(err) {
  if (!err) return null;
  const message = String(err?.shortMessage || err?.message || err);
  if (/user rejected|user denied/i.test(message)) return "Transaction was rejected in your wallet.";
  if (/insufficient funds/i.test(message)) return "Insufficient ETH balance for this contribution.";
  if (/fee|gas/i.test(message) && /estimat|too low/i.test(message))
    return "Couldn't estimate network fees. Try a different amount.";
  return "The transaction couldn't be sent. Please try again.";
}

// Live-pool contribution flow. Rendered only when the wallet is connected on
// Robinhood Chain; sends a real ETH transaction to the pool treasury and
// records the confirmed position locally (indexed by tx hash).
export default function ContributePanel({ asset, wallet }) {
  const [amount, setAmount] = useState("0.1");
  const [sendError, setSendError] = useState(null);
  const ethPrice = useEthPrice();

  const treasuryOk = POOL_TREASURY_ADDRESS && isAddress(POOL_TREASURY_ADDRESS);

  // Real amount raised: the treasury wallet's onchain balance.
  const { data: treasuryBalance } = useBalance({
    address: treasuryOk ? POOL_TREASURY_ADDRESS : undefined,
    chainId: targetChain.id,
    query: { enabled: treasuryOk, refetchInterval: 30_000 },
  });

  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();
  const [txHash, setTxHash] = useState(null);
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
    chainId: targetChain.id,
    query: { enabled: !!txHash },
  });

  const [myTotalEth, setMyTotalEth] = useState(0);
  useEffect(() => {
    setMyTotalEth(getPoolContributionEth(wallet.address, asset.id));
  }, [wallet.address, asset.id, isConfirmed]);

  // Record the position exactly once the tx confirms (dedup by tx hash).
  useEffect(() => {
    if (isConfirmed && txHash) {
      recordContribution(wallet.address, asset.id, {
        amountEth: amount,
        txHash,
        chainId: targetChain.id,
      });
      setMyTotalEth(getPoolContributionEth(wallet.address, asset.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, txHash]);

  const parsedAmount = useMemo(() => {
    try {
      const n = Number(amount);
      if (!Number.isFinite(n) || n <= 0) return null;
      return parseEther(amount);
    } catch (_) {
      return null;
    }
  }, [amount]);

  const amountUsd = ethPrice && parsedAmount ? Number(amount) * ethPrice : null;
  const minEth = ethPrice ? asset.minEntry / ethPrice : FALLBACK_MIN_ETH;
  const belowMin = parsedAmount !== null && Number(amount) < minEth;

  const raisedEth = treasuryBalance ? Number(formatEther(treasuryBalance.value)) : null;
  const raisedUsd = ethPrice !== null && raisedEth !== null ? raisedEth * ethPrice : null;
  const fillPercent =
    raisedUsd !== null ? Math.min(100, (raisedUsd / asset.poolSize) * 100) : null;

  const ownershipPercent =
    ethPrice && myTotalEth > 0
      ? Math.min(100, ((myTotalEth * ethPrice) / asset.poolSize) * 100)
      : null;

  const contribute = async () => {
    if (!parsedAmount || !treasuryOk) return;
    setSendError(null);
    setTxHash(null);
    try {
      const hash = await sendTransactionAsync({
        to: POOL_TREASURY_ADDRESS,
        value: parsedAmount,
        chainId: targetChain.id,
      });
      setTxHash(hash);
    } catch (err) {
      console.error("[pool] contribution failed", err);
      setSendError(toReadableSendError(err));
    }
  };

  const txUrl =
    txHash && targetChain.blockExplorers?.default?.url
      ? `${targetChain.blockExplorers.default.url}/tx/${txHash}`
      : null;

  if (!treasuryOk) {
    return (
      <div className="rounded-2xl bg-oasis-bg px-4 py-3.5 text-center text-sm text-oasis-muted">
        Contributions open shortly — pool settlement address is being finalized.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Raised so far — real treasury balance on Robinhood Chain */}
      <div>
        <div className="flex items-end justify-between text-sm">
          <p className="font-semibold text-oasis-ink">
            {raisedEth !== null ? `${trimEth(raisedEth)} ETH raised` : "Raised onchain"}
          </p>
          <p className="text-xs text-oasis-muted">
            {raisedUsd !== null
              ? `${formatUsd(Math.round(raisedUsd))} of ${formatUsd(asset.poolSize)}`
              : `Pool size ${formatUsd(asset.poolSize)}`}
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-oasis-bg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent ?? 0}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-aqua-400"
          />
        </div>
      </div>

      {/* Amount input */}
      <div>
        <div className="relative">
          <input
            type="number"
            min={0}
            step="0.01"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSendError(null);
            }}
            aria-label="Contribution amount in ETH"
            className="w-full rounded-2xl border border-oasis-line bg-oasis-bg/60 py-3.5 pl-4 pr-16 text-lg font-bold text-oasis-ink outline-none transition focus:border-aqua-300 focus:ring-2 focus:ring-aqua-100"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-oasis-muted">
            ETH
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {QUICK_PICKS.map((v) => (
            <button
              key={v}
              onClick={() => {
                setAmount(v);
                setSendError(null);
              }}
              className="pill border border-oasis-line bg-white px-3 py-1.5 text-xs font-semibold text-oasis-ink transition hover:bg-oasis-bg"
            >
              {v} ETH
            </button>
          ))}
          {amountUsd !== null && (
            <span className="ml-auto text-xs text-oasis-muted">≈ {formatUsd(Math.round(amountUsd))}</span>
          )}
        </div>
        {belowMin && (
          <p className="mt-2 text-xs text-amber-700">
            Minimum entry is {formatUsd(asset.minEntry)} (≈ {trimEth(minEth)} ETH).
          </p>
        )}
      </div>

      {/* CTA */}
      {isConfirmed ? (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 rounded-full bg-aqua-50 py-3.5 text-sm font-semibold text-aqua-700">
            <Check size={17} /> Contribution confirmed
          </div>
          {txUrl && (
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-oasis-ink underline-offset-2 hover:underline"
            >
              View transaction on explorer <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      ) : (
        <motion.button
          onClick={contribute}
          disabled={!parsedAmount || belowMin || isSending || isConfirming}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-aqua-400 py-3.5 text-[15px] font-bold text-oasis-ink transition hover:-translate-y-0.5 hover:shadow-glow disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
        >
          {isSending || isConfirming ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {isSending ? "Confirm in wallet…" : "Confirming onchain…"}
            </>
          ) : (
            <>
              <Zap size={16} /> Contribute
            </>
          )}
        </motion.button>
      )}

      {sendError && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">
          {sendError}
        </p>
      )}

      {/* Your position — from confirmed onchain contributions */}
      {myTotalEth > 0 && (
        <div className="flex items-center justify-between rounded-2xl bg-oasis-bg px-4 py-3 text-sm">
          <span className="text-oasis-muted">Your contribution</span>
          <span className="font-bold text-oasis-ink">
            {trimEth(myTotalEth)} ETH
            {ownershipPercent !== null && (
              <span className="ml-1.5 text-xs font-semibold text-aqua-700">
                ≈ {ownershipPercent.toFixed(2)}% of pool
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

function trimEth(n) {
  return Number(n.toFixed(4)).toString();
}
