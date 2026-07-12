"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight, ShieldCheck, AlertTriangle } from "lucide-react";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { PRESALE_ADDRESS, presaleExplorerUrl, targetChain } from "@/lib/chains";

// $OASIS presale — displays the official deposit address so contributors
// can verify it before sending ETH. Copy + explorer link, no fabricated
// raise figures or countdowns.
export default function PresaleSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PRESALE_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (_) {}
  };

  return (
    <section id="presale" className="container-oasis mt-28">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-8 text-white shadow-lift sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-aqua-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="pill mx-auto gap-1.5 bg-aqua-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-oasis-ink">
            <ShieldCheck size={12} /> $OASIS Presale
          </span>
          <h2 className="mt-5 text-balance text-[30px] leading-[1.05] h-display sm:text-[40px]">
            Verify the official presale address
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Deposit ETH on Robinhood Chain to this address to receive your
            $OASIS allocation. Always confirm the full address below before
            sending — this page is the source of truth.
          </p>

          {/* Address block */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-wide text-white/45">
                Presale deposit address
              </p>
              <RobinhoodChainBadge variant="dark" size="sm" label={targetChain.name} />
            </div>
            <button
              onClick={copy}
              aria-label="Copy presale address"
              className="group mt-3 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-oasis-dark/60 px-4 py-3 text-left transition hover:border-aqua-400/40"
            >
              <span className="min-w-0 break-all font-mono text-sm text-white sm:text-[15px]">
                {PRESALE_ADDRESS}
              </span>
              {copied ? (
                <Check size={18} className="flex-none text-aqua-400" />
              ) : (
                <Copy size={18} className="flex-none text-white/50 transition group-hover:text-aqua-400" />
              )}
            </button>

            <div className="mt-3 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <span className="text-xs text-aqua-400">
                {copied ? "Address copied to clipboard" : " "}
              </span>
              {presaleExplorerUrl && (
                <a
                  href={presaleExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-aqua-400"
                >
                  Verify on explorer <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Safety note */}
          <div className="mx-auto mt-5 flex max-w-xl items-start gap-2.5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-left">
            <AlertTriangle size={16} className="mt-0.5 flex-none text-amber-300" />
            <p className="text-xs leading-relaxed text-amber-100/80">
              Only send ETH on Robinhood Chain to the exact address shown here.
              Oasis will never DM you a different address or ask for your seed
              phrase. Contributing to a token presale carries risk — never
              deposit more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
