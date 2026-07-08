"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  LineChart,
  Wallet,
  Gauge,
  Zap,
  Eye,
  Users,
  Coins,
  Lock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { SectionHeading, Dots, Glow, MiniLedger } from "@/components/Decor";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import CountdownTimer from "@/components/CountdownTimer";
import StatusBadge from "@/components/StatusBadge";
import { genesisDrops, GENESIS_LAUNCH_DATE } from "@/lib/data";

const LEDGER = [
  { badge: "＋", color: "#c8ff00", title: "Pool created", meta: "Rolex Daytona · Genesis", time: "2m" },
  { badge: "☆", color: "#c8ff00", title: "Watchlist added", meta: "Patek Nautilus", time: "8m" },
  { badge: "％", color: "#c8ff00", title: "Ownership tracked", meta: "Wallet-native", time: "1h" },
  { badge: "⋯", color: "#8B9B6E", title: "Settlement pending", meta: "Opens at launch", time: "—" },
];

const WHAT = [
  { icon: LineChart, title: "Onchain pool records", body: "Pool activity is designed to be visible through wallet-native interactions." },
  { icon: Wallet, title: "Wallet-native access", body: "Users connect a wallet to watch pools, join launch flows, and track future ownership." },
  { icon: Gauge, title: "Clear pool status", body: "Each Genesis pool shows launch state, funding status, and asset information in one place." },
];

const WHY = [
  { icon: Zap, title: "Low-friction ownership", body: "Join a pool in a few simple steps, without heavy onboarding." },
  { icon: Eye, title: "Transparent pool activity", body: "Funding and pool actions are visible, so you always know the state." },
  { icon: Wallet, title: "Wallet-native tracking", body: "Positions and activity live with your wallet — nothing to sign up for." },
  { icon: Users, title: "Built for mainstream access", body: "A finance-native experience designed to feel familiar and simple." },
];

const FLOW = [
  { label: "Asset selected", body: "A rare asset is chosen for a Genesis pool." },
  { label: "Pool prepared", body: "Size, entry, and details are set up." },
  { label: "Wallet connected", body: "Members connect a wallet." },
  { label: "User joins / watchlists", body: "Join the launch flow or watch the pool." },
  { label: "Ownership tracked", body: "Ownership is tracked wallet-native." },
  { label: "Exit paths reviewed", body: "Potential exit paths are reviewed." },
];

const DEV = [
  { icon: Wallet, title: "Wallet connection", status: "Preview active", live: true },
  { icon: Coins, title: "Contribution flow", status: "Opens at launch", live: false },
  { icon: LineChart, title: "Ownership dashboard", status: "Available after pool participation", live: false },
];

export default function RobinhoodChainClient() {
  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;

  const stats = [
    { value: genesisDrops.length, label: "Genesis pools" },
    { value: "Launching soon", label: "First pool" },
    { value: lockedCount, label: "Locked drops" },
    { value: "Robinhood Chain", label: "Network", chain: true },
  ];

  return (
    <div className="container-oasis pb-8 pt-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-oasis-muted transition hover:text-oasis-ink"
      >
        <ArrowLeft size={16} /> Back to Oasis
      </Link>

      {/* -------------------------------------------------------------- hero */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Network</p>
          <h1 className="mt-3 text-balance text-[38px] leading-[1.02] h-display sm:text-[52px]">
            Built on Robinhood Chain
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-oasis-muted">
            Oasis is preparing a simple onchain ownership layer for rare
            real-world asset pools, starting with fractional Genesis pools on
            Robinhood Chain.
          </p>
          <div className="mt-6">
            <RobinhoodChainBadge
              variant="lime"
              size="md"
              label="Launching on Robinhood Chain"
              className="uppercase tracking-wide"
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/drops"
              className="pill justify-center gap-2 bg-aqua-400 px-5 py-3 text-sm font-bold text-oasis-ink transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              Explore Genesis Drops <ArrowRight size={16} />
            </Link>
            <Link
              href="/docs"
              className="pill justify-center gap-2 border border-oasis-charcoal bg-oasis-ink px-5 py-3 text-sm font-semibold text-white transition hover:text-aqua-400"
            >
              Read the docs
            </Link>
          </div>
        </motion.div>

        <ChainVisualCard />
      </section>

      {/* --------------------------------------------------------- stats strip */}
      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-oasis-line bg-white p-4 shadow-soft"
          >
            {s.chain ? (
              <div className="pt-0.5">
                <RobinhoodChainBadge variant="light" size="sm" pill={false} label="Robinhood" />
              </div>
            ) : (
              <p className="text-xl font-extrabold tracking-tight text-oasis-ink">{s.value}</p>
            )}
            <p className="mt-1 text-xs text-oasis-muted">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ---------------------------------------------------- what this means */}
      <section className="mt-24">
        <SectionHeading eyebrow="Onchain" title="What this means" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {WHAT.map((c, i) => (
            <FeatureCard key={c.title} {...c} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- why robinhood chain */}
      <section className="mt-24">
        <SectionHeading
          eyebrow="Why Robinhood Chain"
          title="Why Robinhood Chain"
          lead="Oasis is designed around a simple, finance-native user experience for real-world asset pools."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((c, i) => (
            <FeatureCard key={c.title} {...c} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- flow */}
      <section className="mt-24">
        <SectionHeading
          eyebrow="Flow"
          title="How Oasis uses Robinhood Chain"
          lead="This describes the intended product flow — not a guaranteed outcome."
        />
        <FlowTimeline />
      </section>

      {/* ------------------------------------------------- genesis launch status */}
      <section className="mt-24">
        <SectionHeading eyebrow="Launch" title="Genesis launch status" />
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
          >
            <div className="space-y-2.5">
              {genesisDrops.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-2xl border border-oasis-line bg-oasis-bg/40 px-4 py-3.5"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-oasis-ink">
                    {a.isLocked && <Lock size={13} className="text-oasis-muted" />}
                    {a.name}
                  </span>
                  {a.isLocked ? (
                    <span className="pill gap-1 bg-oasis-sand px-2.5 py-1 text-[11px] font-semibold text-oasis-muted">
                      <Lock size={11} /> Locked
                    </span>
                  ) : (
                    <StatusBadge status="Launching Soon" />
                  )}
                </div>
              ))}
            </div>
            <Link
              href="/drops"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-oasis-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:text-aqua-400"
            >
              View Genesis Drops <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <CountdownTimer targetDate={GENESIS_LAUNCH_DATE} label="Launch opens in" />
            <p className="mt-3 text-center text-xs text-oasis-muted">
              First pool opens in ~2.5 weeks. Wallet connection enabled before launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------ in development */}
      <section className="mt-24">
        <SectionHeading
          eyebrow="Status"
          title="In development"
          lead="Oasis is currently in Genesis launch mode. Wallet interfaces, contribution flows, and ownership screens are shown as product previews until the first pool opens."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {DEV.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-3xl border border-oasis-line bg-white p-6 shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-oasis-ink text-aqua-400">
                <d.icon size={20} />
              </div>
              <h3 className="mt-4 font-bold text-oasis-ink">{d.title}</h3>
              <span
                className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  d.live ? "bg-aqua-50 text-aqua-700" : "bg-oasis-sand text-oasis-muted"
                }`}
              >
                {d.live && <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />}
                {d.status}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- independence + preview */}
      <section className="mt-24 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-oasis-line bg-oasis-sand p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-oasis-ink text-aqua-400">
              <Info size={16} />
            </span>
            <h3 className="text-lg font-bold text-oasis-ink">Independent project note</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-oasis-muted">
            Oasis is an independent project building for Robinhood Chain.
            References to Robinhood Chain describe the network Oasis is preparing
            to launch on. Oasis does not claim official partnership, endorsement,
            or affiliation with Robinhood unless separately announced.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/60 p-7">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle size={18} />
            <h3 className="text-lg font-bold">Preview note</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-amber-900/80">
            Oasis is an early product preview using placeholder data. This page is
            informational only and is not legal, financial, or investment advice.
          </p>
          <Link
            href="/risk"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 underline decoration-amber-400 underline-offset-2 hover:text-amber-900"
          >
            Read Risk Disclosure <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------- hero visual
function ChainVisualCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-6 text-white shadow-lift sm:p-8"
    >
      <Glow color="#c8ff00" className="-right-16 -top-20" size={320} opacity={0.16} />
      <Dots className="absolute right-6 top-6 hidden h-24 w-40 opacity-20 sm:block" color="rgba(255,255,255,0.5)" />
      {/* orbital watermark */}
      <Image
        src="/brand/oasis-icon.png"
        alt=""
        aria-hidden
        width={447}
        height={472}
        className="pointer-events-none absolute -bottom-10 -right-8 w-44 opacity-[0.06]"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <RobinhoodChainBadge variant="dark" size="md" label="Robinhood Chain" />
          <span className="pill bg-aqua-400/15 px-2.5 py-1 text-[11px] font-semibold text-aqua-200">
            Live preview
          </span>
        </div>
        <p className="mt-5 text-sm font-semibold text-white/80">Pool activity</p>
        <div className="mt-3">
          <MiniLedger rows={LEDGER} />
        </div>
        <p className="mt-5 text-[11px] leading-relaxed text-white/40">
          Illustrative preview. Onchain functionality is in development.
        </p>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, body, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className="card-hover group rounded-3xl border border-oasis-line bg-white p-6 shadow-soft hover:border-aqua-400/70"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-oasis-ink text-aqua-400">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-bold text-oasis-ink">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-oasis-muted">{body}</p>
    </motion.div>
  );
}

function FlowTimeline() {
  return (
    <div className="mt-10">
      {/* Desktop: horizontal */}
      <div className="hidden overflow-x-auto pb-2 lg:block">
        <div className="min-w-[820px]">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-oasis-ink/25 to-transparent" />
            <div className="relative grid grid-cols-6 gap-3">
              {FLOW.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-oasis-ink/10 bg-aqua-400 text-sm font-bold text-oasis-ink shadow-soft">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold text-oasis-ink">{s.label}</p>
                  <p className="mt-1 px-1 text-xs leading-relaxed text-oasis-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <ol className="relative space-y-5 border-l border-oasis-ink/15 pl-7 lg:hidden">
        {FLOW.map((s, i) => (
          <li key={s.label} className="relative">
            <span className="absolute -left-[38px] flex h-7 w-7 items-center justify-center rounded-full bg-aqua-400 text-xs font-bold text-oasis-ink">
              {i + 1}
            </span>
            <p className="text-sm font-bold text-oasis-ink">{s.label}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-oasis-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
