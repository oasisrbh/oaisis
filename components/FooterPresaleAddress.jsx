"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PRESALE_ADDRESS, presaleExplorerUrl } from "@/lib/chains";

// Copyable $OASIS presale deposit address for the footer, so the official
// address is verifiable from every page.
export default function FooterPresaleAddress({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PRESALE_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  return (
    <div className={className}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-oasis-muted">
        $OASIS presale address
      </p>
      <button
        onClick={copy}
        aria-label="Copy presale address"
        className="group mt-2 flex w-full max-w-xs items-center gap-2 rounded-xl border border-oasis-line bg-white px-3 py-2 transition hover:border-aqua-400"
      >
        <span className="truncate font-mono text-xs text-oasis-ink">
          {PRESALE_ADDRESS}
        </span>
        {copied ? (
          <Check size={14} className="flex-none text-aqua-600" />
        ) : (
          <Copy size={14} className="flex-none text-oasis-muted transition group-hover:text-aqua-600" />
        )}
      </button>
      {presaleExplorerUrl && (
        <a
          href={presaleExplorerUrl}
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
