"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import ConnectButton from "@/components/ConnectButton";
import WalletButton from "@/components/WalletButton";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { useOasisWallet } from "@/hooks/useOasisWallet";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Drops", href: "/drops" },
  { label: "Presale", href: "/#presale" },
  { label: "About", href: "/about" },
];

const X_URL = "https://x.com/OasisRBH";

// Custom X (Twitter) logo — lucide's Twitter icon is the old bird.
function XLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.55l-5.13-6.7L5.2 22H1.94l7.6-8.69L1.5 2h6.72l4.64 6.14L18.244 2Zm-1.14 17.9h1.8L7.24 3.99H5.31L17.104 19.9Z" />
    </svg>
  );
}

// Circular X link button, shared by desktop + mobile.
function XButton({ className = "" }) {
  return (
    <a
      href={X_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Oasis on X"
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-oasis-line text-oasis-ink transition-all duration-200 hover:bg-oasis-ink hover:text-aqua-400 ${className}`}
    >
      <XLogo className="h-4 w-4" />
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { isConnected, isCorrectChain, shortAddress, disconnect } = useOasisWallet();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-oasis-line bg-white/80 shadow-soft backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur"
      }`}
    >
      <div className="container-oasis flex h-16 items-center justify-between">
        <Link href="/" aria-label="Oasis home" className="inline-flex items-center">
          <BrandLogo variant="full" size="md" priority className="hidden sm:inline-flex" />
          <BrandLogo variant="icon" size="md" priority className="sm:hidden" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-aqua-400"
                  : "text-oasis-muted hover:text-oasis-ink"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-oasis-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <XButton className="hidden md:flex" />
          <div className="hidden md:block">
            <WalletButton />
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-oasis-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-oasis-line bg-white md:hidden"
          >
            <div className="container-oasis flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-oasis-ink text-aqua-400"
                      : "text-oasis-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isConnected ? (
                <div className="px-1 pt-2">
                  <div className="rounded-2xl border border-oasis-line bg-white p-2">
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Wallet</p>
                        <p className="font-mono text-sm font-semibold text-oasis-ink">{shortAddress}</p>
                      </div>
                      {isCorrectChain ? (
                        <RobinhoodChainBadge variant="light" size="sm" showText={false} />
                      ) : (
                        <span className="pill gap-1 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          <AlertTriangle size={11} /> Wrong network
                        </span>
                      )}
                    </div>
                    <Link
                      href="/portfolio"
                      onClick={() => setOpen(false)}
                      className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-oasis-ink transition hover:bg-oasis-bg"
                    >
                      <User size={16} className="text-oasis-muted" /> Portfolio
                    </Link>
                    <button
                      onClick={() => {
                        disconnect();
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-oasis-ink transition hover:bg-oasis-bg"
                    >
                      <LogOut size={16} className="text-oasis-muted" /> Disconnect
                    </button>
                  </div>
                  <div className="mt-2">
                    <XButton className="h-11 w-11" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-1 pt-2">
                  <ConnectButton className="flex-1" />
                  <XButton className="h-11 w-11 flex-none" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
