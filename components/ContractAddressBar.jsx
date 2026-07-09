"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { TOKEN_CONTRACT_ADDRESS, tokenContractExplorerUrl } from "@/lib/chains";

// Slim, always-visible bar advertising the Oasis token contract address on
// Robinhood Chain. Copy button + explorer link so the address can always be
// verified onchain.
export default function ContractAddressBar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  return (
    <div className="w-full bg-oasis-ink text-white">
      <div className="container-oasis flex items-center justify-center gap-2 py-1.5 text-xs sm:gap-3">
        <span className="hidden font-semibold uppercase tracking-wide text-aqua-400 sm:inline">
          Oasis CA
        </span>
        <button
          onClick={copy}
          aria-label="Copy Oasis contract address"
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/90 transition hover:border-aqua-400/40 hover:text-aqua-400 sm:text-xs"
        >
          <span className="hidden sm:inline">{TOKEN_CONTRACT_ADDRESS}</span>
          <span className="sm:hidden">
            {TOKEN_CONTRACT_ADDRESS.slice(0, 6)}…{TOKEN_CONTRACT_ADDRESS.slice(-4)}
          </span>
          {copied ? (
            <Check size={13} className="flex-none text-aqua-400" />
          ) : (
            <Copy size={13} className="flex-none text-white/50 transition group-hover:text-aqua-400" />
          )}
        </button>
        {copied && <span className="text-aqua-400">Copied</span>}
        {!copied && tokenContractExplorerUrl && (
          <a
            href={tokenContractExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 font-semibold text-white/60 transition hover:text-aqua-400 sm:flex"
          >
            Verify onchain <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
