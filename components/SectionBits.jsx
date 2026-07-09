"use client";

import { motion } from "framer-motion";
import {
  Gem,
  Layers,
  LineChart,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  Coins,
  Activity,
  KeyRound,
} from "lucide-react";
import { SectionHeading, Dots, Glow, MiniLedger } from "@/components/Decor";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { LIFECYCLE } from "@/lib/data";

// -------------------------------------------------------------- Why collectors
const WHY = [
  {
    icon: Gem,
    title: "Curated rare assets",
    body: "Every pool is a hand-selected, collectible-grade asset — not a random listing.",
  },
  {
    icon: Layers,
    title: "Fractional onchain access",
    body: "Own a percentage from a low minimum. No need to buy the whole asset.",
  },
  {
    icon: LineChart,
    title: "Transparent pool tracking",
    body: "Funding, ownership, and activity are visible in one wallet-native view.",
  },
];

export function WhyCollectors() {
  return (
    <section className="container-oasis mt-28">
      <SectionHeading
        eyebrow="Why Oasis"
        title="Why collectors use Oasis"
        lead="Rare assets. Clear pools. Onchain ownership — designed to feel simple and serious."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {WHY.map((c, idx) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card-hover group relative overflow-hidden rounded-3xl border border-oasis-line bg-white p-7 shadow-soft hover:border-aqua-400/70"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-aqua-400 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-oasis-ink text-aqua-400">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-oasis-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-oasis-muted">{c.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// -------------------------------------------------------------- How it works
const STEPS = [
  { icon: Search, title: "Asset is sourced", body: "A rare, collectible-grade asset is identified and acquired." },
  { icon: ShieldCheck, title: "Authentication & pool setup", body: "Condition and authenticity are reviewed, then the pool is structured." },
  { icon: Users, title: "Users join the pool", body: "Members contribute from a low minimum until the pool closes." },
  { icon: LineChart, title: "Ownership & exit tracked", body: "Positions, activity, and any resale are tracked onchain." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-oasis mt-28 scroll-mt-24">
      <SectionHeading
        eyebrow="How Oasis works"
        title="Discover the drop. Join the pool. Track your ownership."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="card-hover relative rounded-3xl border border-oasis-line bg-white p-6 shadow-soft hover:border-aqua-400/70"
            >
              <span className="pill bg-aqua-400 px-2.5 py-0.5 text-[11px] font-bold text-oasis-ink">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-oasis-ink text-aqua-400">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-bold text-oasis-ink">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-oasis-muted">{s.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// -------------------------------------------------------------- Asset lifecycle
export function Lifecycle() {
  return (
    <section className="container-oasis mt-28">
      <SectionHeading
        eyebrow="Asset lifecycle"
        title="From sourced to exit — a clear product flow"
        lead="This is how a pool moves through Oasis. It describes the process, not a guaranteed outcome."
      />
      <div className="relative mt-12 overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          {/* connector line */}
          <div className="relative mx-auto">
            <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-oasis-ink/25 to-transparent" />
            <div className="relative grid grid-cols-6 gap-3">
              {LIFECYCLE.map((s, idx) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.09 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-oasis-ink/10 bg-aqua-400 text-sm font-bold text-oasis-ink shadow-soft">
                    {idx + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold text-oasis-ink">{s.label}</p>
                  <p className="mt-1 px-1 text-xs leading-relaxed text-oasis-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------- Robinhood Chain
const CHAIN_CARDS = [
  { icon: Coins, title: "Pool contributions", body: "Contribute to a pool and hold a clear onchain position." },
  { icon: LineChart, title: "Ownership tracking", body: "Your ownership percentage updates as pools fund and settle." },
  { icon: Activity, title: "Transparent activity", body: "Pool actions are visible so you always know where things stand." },
  { icon: KeyRound, title: "Wallet-native access", body: "Your positions live with your wallet — nothing to sign up for." },
];

const LEDGER = [
  { badge: "＋", color: "#c8ff00", title: "Wallet connected", meta: "Genesis dashboard", time: "2m" },
  { badge: "☆", color: "#c8ff00", title: "Watchlist added", meta: "Rolex Daytona Panda", time: "8m" },
  { badge: "◐", color: "#8B9B6E", title: "Genesis pool live", meta: "Rolex Daytona Panda", time: "now" },
];

export function ChainSection() {
  return (
    <section className="container-oasis mt-28">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-8 text-white sm:p-12">
        <Glow color="#c8ff00" className="-right-16 -top-20" size={360} opacity={0.14} />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-aqua-400/10 blur-3xl" />
        <Dots className="absolute right-10 top-10 hidden h-24 w-40 opacity-20 lg:block" color="rgba(255,255,255,0.5)" />

        <div className="relative grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <RobinhoodChainBadge variant="dark" size="md" label="Robinhood Chain" />
            <h2 className="mt-4 text-balance text-[30px] leading-[1.06] h-display sm:text-[38px]">
              RWA pools, built on Robinhood Chain
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
              Oasis is a simple onchain ownership layer for rare real-world
              assets, starting with Genesis pools on Robinhood Chain.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {CHAIN_CARDS.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aqua-400/15 text-aqua-200">
                      <Icon size={17} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">{c.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right visual: abstract wallet + ledger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Wallet size={18} className="text-aqua-200" />
                </span>
                <span className="text-sm font-semibold">Pool activity</span>
              </div>
              <span className="pill bg-aqua-400/15 px-2.5 py-1 text-[11px] font-semibold text-aqua-200">
                Live
              </span>
            </div>
            <div className="mt-5">
              <MiniLedger rows={LEDGER} />
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-white/40">
              Pool activity is tracked wallet-native from launch.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
