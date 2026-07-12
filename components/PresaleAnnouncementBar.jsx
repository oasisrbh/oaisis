"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

// Slim, always-visible announcement bar so every visitor learns the $OASIS
// presale is live. Links to the on-page presale verification section.
export default function PresaleAnnouncementBar() {
  return (
    <Link
      href="/#presale"
      className="group block w-full bg-oasis-ink text-white transition hover:bg-black"
    >
      <div className="container-oasis flex items-center justify-center gap-2 py-2 text-center text-xs sm:text-[13px]">
        <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-aqua-400 text-oasis-ink">
          <Zap size={11} strokeWidth={2.5} />
        </span>
        <span className="font-semibold text-aqua-400">$OASIS presale is live</span>
        <span className="hidden text-white/70 sm:inline">
          — deposit ETH on Robinhood Chain to claim your allocation
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white transition group-hover:text-aqua-400">
          View presale
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
