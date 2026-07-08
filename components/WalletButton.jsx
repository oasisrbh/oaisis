"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  ChevronDown,
  User,
  Copy,
  ExternalLink,
  LogOut,
  AlertTriangle,
  Loader2,
  Check,
} from "lucide-react";
import { useOasisWallet } from "@/hooks/useOasisWallet";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";

// Maps a wagmi connector's stable `.type` to a clean display label/icon —
// real wallet names (MetaMask, Rabby, Robinhood Wallet, etc.) surface
// through the injected connector itself once selected.
const CONNECTOR_LABEL = {
  injected: "MetaMask",
  walletConnect: "WalletConnect",
};

// Prefer the wallet's own EIP-6963-announced name (so e.g. Rabby still shows
// as "Rabby") and only fall back to the generic label for the plain
// window.ethereum injected connector with no announced identity.
function connectorLabel(c) {
  if (c.name && c.name !== "Injected") return c.name;
  return CONNECTOR_LABEL[c.type] || c.name;
}

export default function WalletButton({ className = "" }) {
  const wallet = useOasisWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    if (!open) wallet.clearError();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const copyAddress = async () => {
    if (!wallet.address) return;
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  const handleConnect = async (connector) => {
    const ok = await wallet.connect(connector);
    if (ok) setOpen(false);
  };

  const wrongChain = wallet.isConnected && !wallet.isCorrectChain;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={wallet.isConnected ? "Account menu" : "Connect wallet"}
        className={`pill gap-2 px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-400 focus-visible:ring-offset-2 ${
          wrongChain
            ? "border border-amber-300 bg-amber-50 text-amber-700"
            : wallet.isConnected
            ? "border border-oasis-line bg-white text-oasis-ink hover:border-aqua-400"
            : "border border-oasis-charcoal bg-oasis-ink text-white hover:text-aqua-400"
        }`}
      >
        {wallet.isConnecting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : wrongChain ? (
          <AlertTriangle size={15} />
        ) : wallet.isConnected ? (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-oasis-ink text-aqua-400">
            <Check size={11} strokeWidth={3} />
          </span>
        ) : (
          <Wallet size={16} />
        )}
        <span className="font-mono">
          {wallet.isConnecting
            ? "Connecting…"
            : wrongChain
            ? "Wrong Network"
            : wallet.isConnected
            ? wallet.shortAddress
            : "Connect Wallet"}
        </span>
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
            className="absolute right-0 top-full z-[60] mt-2 w-64 overflow-hidden rounded-2xl border border-aqua-400/20 bg-oasis-darkcard text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,255,0,0.06)]"
          >
            {wallet.isConnected ? (
              <ConnectedMenu
                wallet={wallet}
                wrongChain={wrongChain}
                copied={copied}
                onCopy={copyAddress}
                onClose={() => setOpen(false)}
              />
            ) : (
              <ConnectorList wallet={wallet} onConnect={handleConnect} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------- connector picker
function ConnectorList({ wallet, onConnect }) {
  const seen = new Set();
  const options = wallet.connectors.filter((c) => {
    if (seen.has(c.type)) return false;
    seen.add(c.type);
    return true;
  });

  return (
    <div className="p-1.5">
      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-white/45">
        Connect a wallet
      </p>
      {options.map((c) => (
        <button
          key={c.uid}
          onClick={() => onConnect(c)}
          role="menuitem"
          className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-aqua-400"
        >
          <Wallet size={16} className="text-white/45 transition group-hover:text-aqua-400" />
          {connectorLabel(c)}
        </button>
      ))}
      {!wallet.hasWalletConnect && (
        <p className="px-3 pb-1 pt-1 text-[11px] leading-relaxed text-white/35">
          WalletConnect is unavailable until a project ID is configured.
        </p>
      )}
      {wallet.error && (
        <p className="mx-1.5 mt-1 rounded-xl bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
          {wallet.error}
        </p>
      )}
    </div>
  );
}

// ------------------------------------------------------------ account menu
function ConnectedMenu({ wallet, wrongChain, copied, onCopy, onClose }) {
  return (
    <>
      <div className="border-b border-white/10 p-4">
        <p className="text-[11px] uppercase tracking-wide text-white/45">Wallet</p>
        <p className="mt-1 font-mono text-sm font-semibold text-white">{wallet.shortAddress}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-wide text-white/45">Network</p>
          {wrongChain ? (
            <span className="pill gap-1 bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
              <AlertTriangle size={11} /> Wrong network
            </span>
          ) : (
            <RobinhoodChainBadge variant="dark" size="sm" />
          )}
        </div>

        {wrongChain && (
          <button
            onClick={wallet.switchToRobinhoodChain}
            disabled={wallet.isSwitching}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-aqua-400 py-2 text-xs font-bold text-oasis-ink transition hover:brightness-105 disabled:opacity-70"
          >
            {wallet.isSwitching && <Loader2 size={13} className="animate-spin" />}
            Switch to Robinhood Chain
          </button>
        )}
        {wallet.error && (
          <p className="mt-2 rounded-xl bg-amber-400/10 px-3 py-2 text-[11px] text-amber-200">
            {wallet.error}
          </p>
        )}
      </div>

      <div className="p-1.5">
        <MenuLink href="/portfolio" icon={User} onClick={onClose}>
          Portfolio
        </MenuLink>
        <MenuButton icon={Copy} onClick={onCopy}>
          {copied ? "Copied" : "Copy address"}
        </MenuButton>
        {wallet.explorerAddressUrl ? (
          <MenuLink href={wallet.explorerAddressUrl} icon={ExternalLink} external onClick={onClose}>
            View on explorer
          </MenuLink>
        ) : (
          <MenuButton icon={ExternalLink} muted>
            View on explorer
          </MenuButton>
        )}
        <div className="my-1 h-px bg-white/10" />
        <MenuButton
          icon={LogOut}
          onClick={() => {
            wallet.disconnect();
            onClose();
          }}
        >
          Disconnect
        </MenuButton>
      </div>
    </>
  );
}

const itemClass =
  "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-aqua-400 focus-visible:outline-none focus-visible:bg-white/5 focus-visible:text-aqua-400";

function MenuLink({ href, icon: Icon, onClick, children, external }) {
  const iconEl = <Icon size={16} className="text-white/45 transition group-hover:text-aqua-400" />;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        role="menuitem"
        className={itemClass}
      >
        {iconEl}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} role="menuitem" className={itemClass}>
      {iconEl}
      {children}
    </Link>
  );
}

function MenuButton({ icon: Icon, onClick, children, muted, title }) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      title={title}
      className={`${itemClass} ${muted ? "cursor-default opacity-50 hover:bg-transparent hover:text-white/85" : ""}`}
    >
      <Icon size={16} className="text-white/45 transition group-hover:text-aqua-400" />
      {children}
    </button>
  );
}
