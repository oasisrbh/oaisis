"use client";

import { Wallet, Loader2, Check } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";

// Shared connect/disconnect button.
// variant "lime" (aliased from legacy "cyan") = neon lime, black text.
// default = black, lime hover.
export default function ConnectButton({ variant = "solid", className = "" }) {
  const { connected, connecting, address, connect, disconnect } = useWallet();
  const isLime = variant === "cyan" || variant === "lime";

  if (connected) {
    return (
      <button
        onClick={disconnect}
        className={`pill gap-2 px-4 py-2 text-sm transition ${
          isLime
            ? "bg-aqua-400 text-oasis-ink hover:brightness-105"
            : "border border-oasis-line bg-white text-oasis-ink hover:border-aqua-400"
        } ${className}`}
        title="Click to disconnect"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-oasis-ink text-aqua-400">
          <Check size={11} strokeWidth={3} />
        </span>
        {address}
      </button>
    );
  }

  const base = isLime
    ? "bg-aqua-400 text-oasis-ink hover:shadow-glow hover:-translate-y-0.5"
    : "border border-oasis-charcoal bg-oasis-ink text-white hover:text-aqua-400";

  return (
    <button
      onClick={connect}
      disabled={connecting}
      className={`pill gap-2 px-4 py-2 text-sm transition disabled:opacity-70 ${base} ${className}`}
    >
      {connecting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Wallet size={16} />
      )}
      {connecting ? "Connecting…" : "Connect Wallet"}
    </button>
  );
}
