"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  Layers,
  Clock,
  Lock,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Coins,
  Archive,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import CountdownTimer from "@/components/CountdownTimer";
import { useWallet } from "@/components/WalletProvider";
import ConnectButton from "@/components/ConnectButton";
import BrandLogo from "@/components/BrandLogo";
import { portfolio, genesisDrops, formatUsd, GENESIS_LAUNCH_DATE } from "@/lib/data";

const SEGMENT_COLORS = ["#c8ff00", "#8B9B6E", "#B7B7AD", "#d8c98e"];

function LockedBadge() {
  return (
    <span className="pill gap-1 bg-oasis-sand px-2.5 py-1 text-[11px] font-semibold text-oasis-muted">
      <Lock size={11} /> Locked
    </span>
  );
}

export default function PortfolioClient() {
  const { connected, address } = useWallet();
  if (!connected) return <NotConnected />;

  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;

  const stats = [
    { icon: Wallet, label: "Wallet status", value: "Connected" },
    { icon: Layers, label: "Genesis pools", value: genesisDrops.length },
    { icon: Clock, label: "Launching soon", value: launchingCount },
    { icon: Lock, label: "Locked drops", value: lockedCount },
    { icon: Heart, label: "Watchlist", value: genesisDrops.length },
  ];

  return (
    <div className="container-oasis pt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="eyebrow">Portfolio</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-[34px] leading-[1.05] h-display sm:text-[42px]">
              Your Oasis portfolio
            </h1>
            <span className="pill gap-1.5 bg-aqua-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-oasis-ink">
              <Clock size={12} /> Launching in 2.5 weeks
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm text-oasis-muted">
            Track your watchlist, Genesis pool status, and ownership once Oasis launches.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <span className="pill w-fit gap-2 border border-oasis-line bg-white px-4 py-2 text-sm font-mono font-semibold text-oasis-ink shadow-soft">
            <span className="h-2 w-2 rounded-full bg-aqua-400" /> {address}
          </span>
          <div className="w-full sm:w-[300px]">
            <CountdownTimer targetDate={GENESIS_LAUNCH_DATE} label="Genesis launch in" />
          </div>
        </div>
      </motion.div>

      {/* Top stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.05} />
        ))}
      </div>

      {/* Main 3-column grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[320px_1fr_340px]">
        <ContributionPreview />
        <GenesisPoolStatus />
        <OwnershipAllocation />
      </div>

      {/* Completed pools — empty state */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mt-5 rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
      >
        <h3 className="text-lg font-bold text-oasis-ink">Completed pools</h3>
        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-oasis-line py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-oasis-bg text-oasis-muted">
            <Archive size={20} />
          </div>
          <p className="font-semibold text-oasis-ink">No completed pools yet.</p>
          <p className="max-w-md text-sm text-oasis-muted">
            Exit history and proceeds will appear here after Oasis pools complete their lifecycle.
          </p>
        </div>
      </motion.div>

      {/* Recent activity + Watchlist */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
        >
          <h3 className="text-lg font-bold text-oasis-ink">Recent activity</h3>
          <div className="mt-3 divide-y divide-oasis-line">
            {portfolio.recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-2.5 text-sm text-oasis-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
                  {a.action}
                </span>
                <span className="text-xs text-oasis-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
        >
          <h3 className="text-lg font-bold text-oasis-ink">Watchlist</h3>
          <div className="mt-3 space-y-3">
            {genesisDrops.map((a) => {
              const inner = (
                <>
                  <p className="flex items-center gap-1 font-semibold text-oasis-ink">
                    {a.name}
                    {!a.isLocked && (
                      <ArrowUpRight size={14} className="text-oasis-muted opacity-0 transition group-hover:opacity-100" />
                    )}
                  </p>
                  {a.isLocked ? <LockedBadge /> : <StatusBadge status="Launching Soon" />}
                </>
              );
              return a.isLocked ? (
                <div
                  key={a.id}
                  className="flex cursor-default items-center justify-between rounded-2xl border border-oasis-line p-4"
                >
                  {inner}
                </div>
              ) : (
                <Link
                  key={a.id}
                  href={`/drops/${a.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-oasis-line p-4 transition hover:border-aqua-400/60 hover:bg-oasis-bg/40"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="card-hover rounded-3xl border border-oasis-line bg-white p-5 shadow-soft"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-aqua-50 text-aqua-600">
        <Icon size={18} />
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-oasis-ink">{value}</p>
      <p className="mt-0.5 text-xs text-oasis-muted">{label}</p>
    </motion.div>
  );
}

// ------------------------------------------------------ contribution preview
function ContributionPreview() {
  const first = genesisDrops.find((a) => !a.isLocked) || genesisDrops[0];
  const [id, setId] = useState(first.id);
  const [amount, setAmount] = useState(500);
  const [joined, setJoined] = useState(false);
  const asset = genesisDrops.find((a) => a.id === id) || first;
  const ownership = ((Number(amount) || 0) / asset.poolSize) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06 }}
      className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600">
          <Coins size={18} />
        </span>
        <h3 className="text-lg font-bold text-oasis-ink">Contribution preview</h3>
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-oasis-muted">
        Select asset
      </label>
      <select
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-oasis-line bg-oasis-bg/60 px-4 py-3 text-sm font-semibold text-oasis-ink outline-none transition focus:border-aqua-300"
      >
        {genesisDrops.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-oasis-muted">
        Contribution amount
      </label>
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-oasis-muted">$</span>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-2xl border border-oasis-line bg-oasis-bg/60 py-3 pl-8 pr-4 text-lg font-bold text-oasis-ink outline-none transition focus:border-aqua-300 focus:ring-2 focus:ring-aqua-100"
        />
      </div>

      <div className="mt-4 rounded-2xl bg-oasis-ink p-5 text-white">
        <p className="text-[11px] uppercase tracking-wide text-white/60">Estimated ownership</p>
        <p className="mt-1 text-2xl font-bold">{ownership.toFixed(2)}%</p>
        <p className="mt-1 text-xs text-white/50">
          Pool share preview — {ownership.toFixed(2)}% of {formatUsd(asset.poolSize)}
        </p>
      </div>

      {joined ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-aqua-50 py-3 text-sm font-semibold text-aqua-700">
          On the waitlist
        </div>
      ) : (
        <button
          onClick={() => setJoined(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-aqua-400 py-3 text-sm font-bold text-oasis-ink transition hover:brightness-105"
        >
          Join Waitlist <ArrowRight size={15} />
        </button>
      )}
      <p className="mt-3 text-center text-[11px] text-oasis-muted">
        Preview only. Contributions open when the Genesis pool launches.
      </p>
    </motion.div>
  );
}

// ------------------------------------------------------- genesis pool status
function GenesisPoolStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft"
    >
      <h3 className="text-lg font-bold text-oasis-ink">Genesis pool status</h3>
      <div className="mt-4 space-y-3">
        {genesisDrops.map((a) =>
          a.isLocked ? (
            <div key={a.id} className="rounded-2xl border border-oasis-line p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-oasis-ink">
                  <Lock size={14} className="text-oasis-muted" /> {a.name}
                </span>
                <LockedBadge />
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Pool size</p>
                  <p className="select-none text-sm font-bold text-oasis-ink/80 blur-[6px]">
                    {formatUsd(a.poolSize)}
                  </p>
                </div>
                <span className="text-xs text-oasis-muted">Full details revealed at launch</span>
              </div>
            </div>
          ) : (
            <Link
              key={a.id}
              href={`/drops/${a.id}`}
              className="group block rounded-2xl border border-oasis-line p-4 transition hover:border-aqua-400/60 hover:bg-oasis-bg/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold text-oasis-ink">
                  {a.name}
                  <ArrowUpRight size={14} className="text-oasis-muted opacity-0 transition group-hover:opacity-100" />
                </span>
                <StatusBadge status="Launching Soon" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Launches in</p>
                  <p className="text-sm font-bold text-oasis-ink">17d 12h</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Pool size</p>
                  <p className="text-sm font-bold text-oasis-ink">{formatUsd(a.poolSize)}</p>
                </div>
                <span className="pill ml-auto bg-oasis-sand px-3.5 py-1.5 text-xs font-semibold text-oasis-ink transition group-hover:bg-aqua-400">
                  View Pool
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </motion.div>
  );
}

// -------------------------------------------------- ownership allocation (empty)
function OwnershipAllocation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-6 text-white shadow-lift"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-aqua-400/25 blur-3xl" />
      <div className="relative">
        <h3 className="text-lg font-bold">Ownership allocation</h3>

        <div className="mt-6 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-aqua-400/20 bg-oasis-dark/70">
            <BrandLogo variant="icon" size="md" />
          </div>
          <p className="mt-4 text-base font-bold">No ownership yet</p>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            Your allocation will appear here after you join a live pool.
          </p>
        </div>

        {/* faint placeholder segments — no percentages */}
        <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
          {genesisDrops.map((a, i) => (
            <div key={a.id} className="flex items-center gap-2.5 opacity-40">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
              />
              <span className="text-sm text-white/70">{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------- disconnected state
function NotConnected() {
  return (
    <div className="container-oasis relative pt-12">
      {/* Blurred preview dashboard behind */}
      <div className="pointer-events-none absolute inset-x-0 top-12 select-none px-5 opacity-60 blur-[7px] sm:px-8 lg:px-10" aria-hidden="true">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-3xl border border-oasis-line bg-white p-5 shadow-soft">
                <div className="h-10 w-10 rounded-2xl bg-aqua-50" />
                <div className="mt-4 h-6 w-16 rounded bg-oasis-line" />
                <div className="mt-2 h-3 w-20 rounded bg-oasis-line/70" />
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr_340px]">
            <div className="h-80 rounded-[1.5rem] border border-oasis-line bg-white shadow-soft" />
            <div className="h-80 rounded-[1.5rem] border border-oasis-line bg-white shadow-soft" />
            <div className="h-80 rounded-[1.5rem] bg-gradient-to-br from-navy-700 to-navy-900 shadow-lift" />
          </div>
        </div>
      </div>

      {/* Connect card */}
      <div className="relative flex min-h-[70vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto max-w-lg rounded-[2rem] p-10 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-aqua-400/20 bg-gradient-to-br from-navy-700 to-navy-900">
            <BrandLogo variant="icon" size="md" />
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-oasis-muted">
            <Lock size={12} /> Wallet required
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-oasis-ink">
            Connect your wallet to view your Oasis portfolio
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-oasis-muted">
            Track your watchlist and Genesis pool status. Ownership appears here
            once Oasis launches.
          </p>
          <div className="mt-7 flex justify-center">
            <ConnectButton variant="cyan" className="px-6 py-3 text-[15px]" />
          </div>
          <Link
            href="/drops"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-oasis-muted transition hover:text-oasis-ink"
          >
            Or explore pools first <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
