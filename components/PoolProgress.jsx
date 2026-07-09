"use client";

import { motion } from "framer-motion";
import { formatEther } from "viem";
import { useBalance } from "wagmi";
import { POOL_TREASURY_ADDRESS, targetChain } from "@/lib/chains";
import { useEthPrice } from "@/hooks/useEthPrice";
import { formatUsd } from "@/lib/data";
import { isAddress } from "viem";

const RESERVED_STRIPES =
  "repeating-linear-gradient(-45deg, #c8ff00 0 4px, #eef3d4 4px 8px)";
const RESERVED_DOT =
  "repeating-linear-gradient(-45deg, #c8ff00 0 2px, #eef3d4 2px 4px)";

// Live-pool fill bar, visible to every visitor (no wallet required — the
// treasury balance is read over the public RPC). Two labeled segments:
// solid lime = real onchain contributions (treasury balance), striped =
// offchain commitments reserved before launch. The two are never blended.
export default function PoolProgress({ asset, className = "" }) {
  const ethPrice = useEthPrice();
  const treasuryOk = POOL_TREASURY_ADDRESS && isAddress(POOL_TREASURY_ADDRESS);

  const { data: treasuryBalance } = useBalance({
    address: treasuryOk ? POOL_TREASURY_ADDRESS : undefined,
    chainId: targetChain.id,
    query: { enabled: treasuryOk, refetchInterval: 30_000 },
  });

  const raisedEth = treasuryBalance ? Number(formatEther(treasuryBalance.value)) : null;
  const raisedUsd = ethPrice !== null && raisedEth !== null ? raisedEth * ethPrice : null;
  const onchainPercent =
    raisedUsd !== null ? Math.min(100, (raisedUsd / asset.poolSize) * 100) : 0;
  const reservedUsd = asset.reservedUsd || 0;
  const reservedPercent = Math.min(
    100 - onchainPercent,
    (reservedUsd / asset.poolSize) * 100
  );
  const committedPercent = Math.min(100, onchainPercent + reservedPercent);

  return (
    <div className={className}>
      <div className="flex items-end justify-between text-sm">
        <p className="font-semibold text-oasis-ink">
          {committedPercent > 0
            ? `${Number(committedPercent.toFixed(1))}% committed`
            : "Raised onchain"}
        </p>
        <p className="text-xs text-oasis-muted">
          {formatUsd(Math.round((raisedUsd || 0) + reservedUsd))} of {formatUsd(asset.poolSize)}
        </p>
      </div>
      <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-oasis-bg">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${onchainPercent}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full flex-none bg-aqua-400"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${reservedPercent}%` }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-full flex-none"
          style={{ backgroundImage: RESERVED_STRIPES }}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-oasis-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-aqua-400" />
          {raisedEth !== null ? `${trimEth(raisedEth)} ETH onchain` : "Onchain contributions"}
        </span>
        {reservedUsd > 0 && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundImage: RESERVED_DOT }}
            />
            {formatUsd(reservedUsd)} reserved — offchain commitments
          </span>
        )}
      </div>
    </div>
  );
}

function trimEth(n) {
  return Number(n.toFixed(4)).toString();
}
