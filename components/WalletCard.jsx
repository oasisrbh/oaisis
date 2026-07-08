"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Lock } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";
import ConnectButton from "@/components/ConnectButton";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import BrandLogo from "@/components/BrandLogo";
import { genesisDrops } from "@/lib/data";

// Navy gradient wallet card beside the hero — a premium finance surface.
// Launch-safe: no holdings or value are shown before the Genesis pool opens.
export default function WalletCard() {
  const { connected } = useWallet();
  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-7 text-white shadow-lift"
    >
      {/* subtle animated glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-aqua-400/25 blur-3xl"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-aqua-400/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ boxShadow: [
              "0 0 0 0 rgba(38,206,189,0.0)",
              "0 0 0 8px rgba(38,206,189,0.10)",
              "0 0 0 0 rgba(38,206,189,0.0)",
            ] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-aqua-400/20 bg-oasis-dark/70 backdrop-blur"
          >
            <BrandLogo variant="icon" size="sm" />
          </motion.div>
          <RobinhoodChainBadge variant="dark" size="sm" label="Robinhood Chain" />
        </div>

        {!connected ? (
          <>
            <h3 className="mt-6 text-xl font-bold leading-snug">Your Oasis portfolio</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Connect a wallet to track your watchlist and Genesis pool status.
            </p>

            {/* Blurred, locked mini preview */}
            <div className="relative mt-5">
              <div className="space-y-2.5 select-none blur-[5px]" aria-hidden="true">
                {genesisDrops.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-aqua-400" />
                      <span className="text-sm text-white/80">{a.name}</span>
                    </div>
                    <span className="text-sm font-semibold">—</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="pill gap-1.5 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                  <Lock size={12} /> Locked
                </span>
              </div>
            </div>

            <div className="mt-5">
              <ConnectButton variant="cyan" className="w-full py-3 text-[15px]" />
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 text-sm text-white/55">Wallet connected</p>
            <p className="mt-1 text-2xl font-bold">Genesis preview</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              No holdings yet. Your ownership appears here after the Genesis pool launches.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold">{launchingCount}</p>
                <p className="text-xs text-white/50">Launching soon</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold">{lockedCount}</p>
                <p className="text-xs text-white/50">Locked drops</p>
              </div>
            </div>

            <a
              href="/portfolio"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-aqua-400 py-3 text-[15px] font-bold text-oasis-ink transition hover:brightness-105"
            >
              View portfolio <ArrowRight size={16} />
            </a>
          </>
        )}

        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/45">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-aqua-400/20">
            <Check size={11} className="text-aqua-200" />
          </span>
          Wallet-native — nothing to sign up for
        </div>
      </div>
    </motion.div>
  );
}
