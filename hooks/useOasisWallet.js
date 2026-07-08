"use client";

import { useCallback, useMemo, useState } from "react";
import { numberToHex } from "viem";
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { targetChain } from "@/lib/chains";
import { hasWalletConnect } from "@/lib/wagmi";

export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

// Human-readable messages for the wallet errors users actually hit.
// Raw provider/RPC errors are logged to the console, never shown as-is.
function toReadableError(err) {
  if (!err) return null;
  const message = String(err?.shortMessage || err?.message || err);
  if (/user rejected/i.test(message)) return "Connection request was rejected.";
  if (/no injected|not found|provider not found/i.test(message)) return "No wallet extension found in this browser.";
  if (/already processing|already pending/i.test(message)) return "A wallet request is already open — check your wallet.";
  if (/chain.*not.*configured|unsupported chain/i.test(message)) return "That network isn't supported yet.";
  return "Something went wrong with your wallet. Please try again.";
}

// Adds Robinhood Chain to an injected wallet via EIP-3085, for wallets that
// don't yet recognize the chain (wagmi's switchChain alone can't add chains).
async function addRobinhoodChainToInjectedWallet(chain) {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No injected wallet available to add the network to.");
  }
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: numberToHex(chain.id),
        chainName: chain.name,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: chain.rpcUrls.default.http,
        blockExplorerUrls: chain.blockExplorers?.default?.url ? [chain.blockExplorers.default.url] : [],
      },
    ],
  });
}

export function useOasisWallet() {
  const { address, isConnected, isConnecting, isReconnecting, connector } = useAccount();
  const chainId = useChainId();
  const { connectors, connectAsync, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitchPending } = useSwitchChain();
  const [error, setError] = useState(null);

  const isCorrectChain = isConnected && chainId === targetChain.id;

  const connect = useCallback(
    async (targetConnector) => {
      setError(null);
      try {
        await connectAsync({ connector: targetConnector });
        return true;
      } catch (err) {
        console.error("[wallet] connect failed", err);
        setError(toReadableError(err));
        return false;
      }
    },
    [connectAsync]
  );

  const switchToRobinhoodChain = useCallback(async () => {
    setError(null);
    try {
      await switchChainAsync({ chainId: targetChain.id });
    } catch (err) {
      // Wallet doesn't recognize the chain yet (EIP-3085 add-chain path).
      const code = err?.cause?.code ?? err?.code;
      if (code === 4902 || /unrecognized chain|4902/i.test(String(err?.message))) {
        try {
          await addRobinhoodChainToInjectedWallet(targetChain);
        } catch (addErr) {
          console.error("[wallet] add chain failed", addErr);
          setError("Couldn't add Robinhood Chain to your wallet. Add it manually and try again.");
        }
        return;
      }
      console.error("[wallet] switch chain failed", err);
      setError(toReadableError(err));
    }
  }, [switchChainAsync]);

  const explorerAddressUrl = useMemo(() => {
    if (!address || !targetChain.blockExplorers?.default?.url) return null;
    return `${targetChain.blockExplorers.default.url}/address/${address}`;
  }, [address]);

  return {
    address,
    shortAddress: shortenAddress(address),
    isConnected,
    isConnecting: isConnecting || isReconnecting || isConnectPending,
    isSwitching: isSwitchPending,
    chainId,
    isCorrectChain,
    targetChain,
    connector,
    connectors,
    hasWalletConnect,
    connect,
    disconnect,
    switchToRobinhoodChain,
    explorerAddressUrl,
    error,
    clearError: () => setError(null),
  };
}
