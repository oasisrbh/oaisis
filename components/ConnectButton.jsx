"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Loader2 } from "lucide-react";
import { useOasisWallet } from "@/hooks/useOasisWallet";

const CONNECTOR_LABEL = {
  injected: "Browser Wallet",
  coinbaseWallet: "Coinbase Wallet",
  walletConnect: "WalletConnect",
};

// Standalone "Connect Wallet" trigger for CTA surfaces (hero card, portfolio
// empty state) — opens a small connector picker. For the header's full
// account menu (connected state, network switching, etc.) use WalletButton.
export default function ConnectButton({ variant = "solid", className = "" }) {
  const wallet = useOasisWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isLime = variant === "cyan" || variant === "lime";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleConnect = async (connector) => {
    const ok = await wallet.connect(connector);
    if (ok) setOpen(false);
  };

  const base = isLime
    ? "bg-aqua-400 text-oasis-ink hover:shadow-glow hover:-translate-y-0.5"
    : "border border-oasis-charcoal bg-oasis-ink text-white hover:text-aqua-400";

  const seen = new Set();
  const options = wallet.connectors.filter((c) => {
    if (seen.has(c.type)) return false;
    seen.add(c.type);
    return true;
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={wallet.isConnecting}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Connect wallet"
        className={`pill w-full gap-2 px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-400 focus-visible:ring-offset-2 disabled:opacity-70 ${base}`}
      >
        {wallet.isConnecting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Wallet size={16} />
        )}
        {wallet.isConnecting ? "Connecting…" : "Connect Wallet"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-2xl border border-aqua-400/20 bg-oasis-darkcard p-1.5 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,255,0,0.06)] sm:left-auto sm:w-60"
          >
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-white/45">
              Connect a wallet
            </p>
            {options.map((c) => (
              <button
                key={c.uid}
                onClick={() => handleConnect(c)}
                role="menuitem"
                className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-aqua-400"
              >
                <Wallet size={16} className="text-white/45 transition group-hover:text-aqua-400" />
                {CONNECTOR_LABEL[c.type] || c.name}
              </button>
            ))}
            {wallet.error && (
              <p className="mx-1.5 mt-1 rounded-xl bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
                {wallet.error}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
