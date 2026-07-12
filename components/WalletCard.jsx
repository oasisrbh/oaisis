"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Layers, Heart, Zap } from "lucide-react";
import { useOasisWallet } from "@/hooks/useOasisWallet";
import ConnectButton from "@/components/ConnectButton";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import BrandLogo from "@/components/BrandLogo";
import CountdownTimer from "@/components/CountdownTimer";
import { genesisDrops, GENESIS_LAUNCH_DATE } from "@/lib/data";

// Navy gradient wallet card beside the hero — a premium finance surface.
export default function WalletCard() {
  const { isConnected } = useOasisWallet();
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

        {!isConnected ? (
          <>
            <h3 className="mt-6 text-xl font-bold leading-snug">Your Oasis portfolio</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Connect your wallet to view pool access, watchlist, and Genesis
              launch status.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold">{genesisDrops.length}</p>
                <p className="text-xs text-white/50">Genesis pools</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold">{lockedCount}</p>
                <p className="text-xs text-white/50">Locked drops</p>
              </div>
            </div>

            <div className="mt-5">
              <ConnectButton variant="cyan" className="w-full py-3 text-[15px]" />
            </div>

            <a
              href="/#presale"
              className="group mt-3 flex items-center justify-between gap-2 rounded-xl border border-aqua-400/30 bg-aqua-400/10 px-4 py-3 transition hover:border-aqua-400/60"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-aqua-300">
                <Zap size={15} /> $OASIS presale is live
              </span>
              <ArrowRight size={15} className="text-aqua-300 transition-transform group-hover:translate-x-0.5" />
            </a>
          </>
        ) : (
          <>
            <p className="mt-6 flex items-center gap-1.5 text-sm text-white/55">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-aqua-400/20">
                <Check size={10} className="text-aqua-200" />
              </span>
              Wallet connected
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="flex items-center gap-1.5 text-xs text-white/50">
                  <Heart size={11} /> Watchlist
                </p>
                <p className="mt-1 text-xl font-bold">{genesisDrops.length}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="flex items-center gap-1.5 text-xs text-white/50">
                  <Layers size={11} /> Genesis pools
                </p>
                <p className="mt-1 text-xl font-bold">{genesisDrops.length}</p>
              </div>
            </div>

            <div className="mt-4">
              <CountdownTimer targetDate={GENESIS_LAUNCH_DATE} label="Locked drops unlock in" />
            </div>

            <a
              href="/portfolio"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-aqua-400 py-3 text-[15px] font-bold text-oasis-ink transition hover:brightness-105"
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
