import { http, createConfig, createStorage, cookieStorage } from "wagmi";
// Imported from their specific subpaths (not the `wagmi/connectors` barrel):
// the barrel also re-exports `baseAccount`, which pulls in Coinbase's CDP SDK
// and its unrelated, optional Solana dependency chain — unnecessary for a
// pure EVM/Robinhood Chain wallet flow and not resolvable without extra deps.
import { injected } from "wagmi/connectors/injected";
import { coinbaseWallet } from "wagmi/connectors/coinbaseWallet";
import { walletConnect } from "wagmi/connectors/walletConnect";
import { robinhoodChain, robinhoodChainTestnet, supportedChains } from "@/lib/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// injected() auto-discovers every EIP-6963-announced provider (MetaMask,
// Rabby, Robinhood Wallet, Coinbase extension, etc.) — no per-wallet
// connector needed for browser extensions.
const connectors = [
  injected({ shimDisconnect: true }),
  coinbaseWallet({ appName: "Oasis" }),
];

// WalletConnect only registers when a real project ID is configured, so a
// missing env var never breaks the connect flow — it just omits the option.
if (walletConnectProjectId) {
  connectors.push(
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
      metadata: {
        name: "Oasis",
        description: "Fractional ownership of real-world assets, built on Robinhood Chain.",
        url: typeof window !== "undefined" ? window.location.origin : "https://oasis.example",
        icons: [],
      },
    })
  );
}

export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors,
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
  transports: {
    [robinhoodChain.id]: http(robinhoodChain.rpcUrls.default.http[0]),
    [robinhoodChainTestnet.id]: http(robinhoodChainTestnet.rpcUrls.default.http[0]),
  },
});

export const hasWalletConnect = !!walletConnectProjectId;
