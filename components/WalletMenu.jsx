"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, User, Copy, ExternalLink, LogOut } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";
import ConnectButton from "@/components/ConnectButton";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";

// Desktop wallet control: Connect Wallet when disconnected, account dropdown when connected.
export default function WalletMenu() {
  const { connected } = useWallet();
  if (!connected) return <ConnectButton />;
  return <AccountDropdown />;
}

function AccountDropdown() {
  const { address, fullAddress, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="pill gap-2 border border-oasis-line bg-white px-4 py-2 text-sm text-oasis-ink transition hover:border-aqua-400"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-oasis-ink text-aqua-400">
          <Check size={11} strokeWidth={3} />
        </span>
        <span className="font-mono">{address}</span>
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-[60] mt-2 w-60 overflow-hidden rounded-2xl border border-aqua-400/20 bg-oasis-darkcard text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,255,0,0.06)]"
          >
            {/* Account header */}
            <div className="border-b border-white/10 p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/45">Wallet</p>
              <p className="mt-1 font-mono text-sm font-semibold text-white">{address}</p>
              <RobinhoodChainBadge variant="dark" size="sm" className="mt-2.5" />
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <MenuLink href="/portfolio" icon={User} onClick={() => setOpen(false)}>
                Portfolio
              </MenuLink>
              <MenuButton icon={Copy} onClick={copyAddress}>
                {copied ? "Copied" : "Copy address"}
              </MenuButton>
              <MenuButton
                icon={ExternalLink}
                muted
                trailing={<span className="text-[10px] font-semibold text-white/35">Soon</span>}
                title="Block explorer coming soon"
              >
                View on explorer
              </MenuButton>
              <div className="my-1 h-px bg-white/10" />
              <MenuButton
                icon={LogOut}
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
              >
                Disconnect
              </MenuButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const itemClass =
  "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-aqua-400";

function MenuLink({ href, icon: Icon, onClick, children }) {
  return (
    <Link href={href} onClick={onClick} role="menuitem" className={itemClass}>
      <Icon size={16} className="text-white/45 transition group-hover:text-aqua-400" />
      {children}
    </Link>
  );
}

function MenuButton({ icon: Icon, onClick, children, trailing, muted, title }) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      title={title}
      className={`${itemClass} justify-between ${muted ? "cursor-default hover:bg-transparent hover:text-white/85" : ""}`}
    >
      <span className="flex items-center gap-2.5">
        <Icon size={16} className={`text-white/45 transition ${muted ? "" : "group-hover:text-aqua-400"}`} />
        {children}
      </span>
      {trailing}
    </button>
  );
}
