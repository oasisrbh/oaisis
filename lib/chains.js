import { defineChain } from "viem";

// ---------------------------------------------------------------------------
// Robinhood Chain — network definitions (viem `defineChain`).
// Oasis is built on Robinhood Chain. Oasis is an independent platform and
// does not claim official Robinhood partnership, endorsement, or affiliation.
// ---------------------------------------------------------------------------

export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.chain.robinhood.com/"],
    },
    public: {
      http: ["https://rpc.mainnet.chain.robinhood.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Robinhood Chain Explorer",
      url: "https://robinhoodchain.blockscout.com",
    },
  },
});

export const robinhoodChainTestnet = defineChain({
  id: 46630,
  name: "Robinhood Chain Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.chain.robinhood.com"],
    },
    public: {
      http: ["https://rpc.testnet.chain.robinhood.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Robinhood Chain Testnet Explorer",
      url: "https://explorer.testnet.chain.robinhood.com",
    },
  },
  testnet: true,
});

// The chain Oasis targets, resolved from NEXT_PUBLIC_CHAIN_ENV.
// Defaults to mainnet in production if the env var is unset.
export const isTestnetEnv = process.env.NEXT_PUBLIC_CHAIN_ENV === "testnet";
export const targetChain = isTestnetEnv ? robinhoodChainTestnet : robinhoodChain;

// Both networks are always registered with wagmi so a connected wallet on
// either one resolves cleanly; `targetChain` is the one Oasis prompts for.
export const supportedChains = [robinhoodChain, robinhoodChainTestnet];

// Treasury wallet that live-pool contributions settle to until per-pool
// contracts are deployed. The address is public (it's onchain), so a
// default is committed; NEXT_PUBLIC_POOL_TREASURY_ADDRESS overrides it
// per environment.
export const POOL_TREASURY_ADDRESS =
  process.env.NEXT_PUBLIC_POOL_TREASURY_ADDRESS ||
  "0x45C74020De0db7871387aB294E2AA5cFe67b64D6";

// Oasis token contract address on Robinhood Chain (public onchain data).
export const TOKEN_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ||
  "0x488fAF4Ee769eFef12CA11a00e976E2aa6044FA6";

// Explorer link for the token contract on the targeted chain.
export const tokenContractExplorerUrl = targetChain.blockExplorers?.default?.url
  ? `${targetChain.blockExplorers.default.url}/token/${TOKEN_CONTRACT_ADDRESS}`
  : null;
