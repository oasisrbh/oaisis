"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useOasisWallet } from "@/hooks/useOasisWallet";

// Inline banner shown wherever a connected-but-wrong-network state should be
// called out on the page itself (not just in the header dropdown) — e.g.
// above a pool's CTA. Renders nothing when disconnected or already correct.
export default function ChainGuard({ className = "" }) {
  const { isConnected, isCorrectChain, targetChain, isSwitching, switchToRobinhoodChain, error } =
    useOasisWallet();

  if (!isConnected || isCorrectChain) return null;

  return (
    <div
      role="alert"
      className={`flex flex-col gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
        <AlertTriangle size={16} className="flex-none" />
        Switch to {targetChain.name} to continue.
      </p>
      <button
        onClick={switchToRobinhoodChain}
        disabled={isSwitching}
        className="flex items-center justify-center gap-2 rounded-full bg-oasis-ink px-4 py-2 text-xs font-bold text-aqua-400 transition hover:brightness-110 disabled:opacity-70"
      >
        {isSwitching && <Loader2 size={13} className="animate-spin" />}
        Switch Network
      </button>
      {error && <p className="text-xs text-amber-700 sm:hidden">{error}</p>}
    </div>
  );
}
