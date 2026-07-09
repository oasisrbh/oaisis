"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { TOKEN_CONTRACT_ADDRESS, tokenContractExplorerUrl } from "@/lib/chains";

// Copyable Oasis token contract address block for the footer.
export default function FooterContractAddress({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  return (
    <div className={className}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-oasis-muted">
        Oasis contract address
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={copy}
          aria-label="Copy Oasis contract address"
          className="group flex min-w-0 items-center gap-2 rounded-xl border border-oasis-line bg-white px-3 py-2 transition hover:border-aqua-400"
        >
          <span className="truncate font-mono text-xs text-oasis-ink">
            {TOKEN_CONTRACT_ADDRESS}
          </span>
          {copied ? (
            <Check size={14} className="flex-none text-aqua-600" />
          ) : (
            <Copy size={14} className="flex-none text-oasis-muted transition group-hover:text-aqua-600" />
          )}
        </button>
      </div>
      {tokenContractExplorerUrl && (
        <a
          href={tokenContractExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-medium text-oasis-muted transition hover:text-oasis-ink"
        >
          {copied ? "Copied to clipboard" : "Verify on explorer"}
        </a>
      )}
    </div>
  );
}
