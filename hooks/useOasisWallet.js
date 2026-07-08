"use client";

import { useCallback, useMemo, useState } from "react";
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
  if (/rejected switch after adding network/i.test(message)) return "Network add was rejected in your wallet.";
  if (/user rejected/i.test(message)) return "Connection request was rejected.";
  if (/no injected|not found|provider not found/i.test(message)) return "No wallet extension found in this browser.";
  if (/already processing|already pending/i.test(message)) return "A wallet request is already open — check your wallet.";
  if (/chain.*not.*configured|unsupported chain/i.test(message)) return "That network isn't supported yet.";
  if (/switch chain is not supported/i.test(message)) return "Your wallet doesn't support switching networks automatically. Add Robinhood Chain manually.";
  return "Something went wrong with your wallet. Please try again.";
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

  // wagmi's injected connector already falls back to EIP-3085
  // `wallet_addEthereumChain` on its own when the wallet doesn't recognize
  // the chain (error code 4902), then retries the switch — so a single call
  // here both adds and switches to Robinhood Chain in one wallet prompt.
  const switchToRobinhoodChain = useCallback(async () => {
    setError(null);
    try {
      await switchChainAsync({
        chainId: targetChain.id,
        addEthereumChainParameter: {
          chainName: targetChain.name,
          nativeCurrency: targetChain.nativeCurrency,
          rpcUrls: targetChain.rpcUrls.default.http,
          blockExplorerUrls: targetChain.blockExplorers?.default?.url
            ? [targetChain.blockExplorers.default.url]
            : [],
        },
      });
    } catch (err) {
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
