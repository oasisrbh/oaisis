"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Package,
  FileText,
  FileCheck2,
  Receipt,
  Lock,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Gauge,
  Store,
  Handshake,
  Tag,
  Repeat,
  Calculator,
  Calendar,
  Loader2,
  Check,
} from "lucide-react";
import AssetVisual from "@/components/AssetVisual";
import StatusBadge from "@/components/StatusBadge";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import CountdownTimer from "@/components/CountdownTimer";
import ConnectButton from "@/components/ConnectButton";
import ContributePanel from "@/components/ContributePanel";
import { useOasisWallet } from "@/hooks/useOasisWallet";
import { hasJoinedWaitlist, joinWaitlist } from "@/lib/waitlist";
import { formatUsd, activity, RISKS, EXIT_PATHS, GENESIS_LAUNCH_LABEL } from "@/lib/data";

const EXIT_ICONS = { store: Store, handshake: Handshake, tag: Tag, repeat: Repeat };
const DOC_ICONS = {
  "Authentication report": FileCheck2,
  "Condition report": FileText,
  "Purchase invoice": Receipt,
  "Custody record": Package,
};

function Section({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function ModuleHeading({ eyebrow, title }) {
  return (
    <div className="mb-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-oasis-ink">{title}</h2>
    </div>
  );
}

export default function AssetDetailClient({ asset }) {
  const [watching, setWatching] = useState(false);
  const [joined, setJoined] = useState(false);
  const wallet = useOasisWallet();
  const locked = !!asset.isLocked;
  const live = asset.status === "Live" && !locked;
  const statusLabel = asset.launchDate && !locked ? `Launching ${GENESIS_LAUNCH_LABEL}` : undefined;
  const risks = asset.launchDate
    ? [...RISKS, "Launch timing may change. Final pool terms will be published before contributions open."]
    : RISKS;

  useEffect(() => {
    setJoined(hasJoinedWaitlist(wallet.address, asset.id));
  }, [wallet.address, asset.id]);

  const handleJoinWaitlist = () => {
    joinWaitlist(wallet.address, asset.id);
    setJoined(true);
  };

  return (
    <div className="container-oasis pt-8">
      <Link
        href="/drops"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-oasis-muted transition hover:text-oasis-ink"
      >
        <ArrowLeft size={16} /> Back to pools
      </Link>

      {/* ---------------------------------------------------------------- top */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Left — gallery + facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-[2rem] border border-oasis-line bg-white p-4 shadow-soft">
            <AssetVisual
              icon={asset.icon}
              image={asset.image}
              brand={asset.brand}
              accent={asset.accent}
              gradient={asset.gradient}
              size="xl"
            />
            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="relative overflow-hidden rounded-2xl ring-2 ring-aqua-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.image} alt="" className="h-16 w-full object-cover" />
              </div>
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={`flex h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${asset.gradient} text-[10px] font-medium text-oasis-ink/40`}
                >
                  View {n + 2}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Category", value: asset.category },
              { label: "Type", value: asset.assetType },
              { label: "Condition", value: asset.condition },
              { label: "Chain", value: "Robinhood" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-oasis-line bg-white p-4 text-center shadow-soft"
              >
                <p className="text-[10px] uppercase tracking-wide text-oasis-muted">{f.label}</p>
                {f.label === "Chain" ? (
                  <div className="mt-1 flex justify-center">
                    <RobinhoodChainBadge variant="light" size="sm" pill={false} label="Robinhood" />
                  </div>
                ) : (
                  <p className="mt-1 text-sm font-bold text-oasis-ink">{f.value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — pool panel (sticky) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <div className="lg:sticky lg:top-24">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700">
                {asset.category}
              </span>
              <StatusBadge status={locked ? "Locked" : asset.status} label={statusLabel} />
              <RobinhoodChainBadge variant="light" size="sm" label="Robinhood Chain" />
            </div>
            <h1 className="mt-3 text-balance text-[34px] leading-[1.05] h-display sm:text-[40px]">
              {asset.name}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-oasis-muted">
              {asset.description}
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft">
              {asset.launchDate && (
                <div className="mb-5">
                  <CountdownTimer targetDate={asset.launchDate} />
                </div>
              )}

              {locked ? (
                <div className="flex items-center gap-2 rounded-2xl bg-oasis-bg px-4 py-3.5 text-sm text-oasis-muted">
                  <Calendar size={16} className="flex-none text-oasis-ink/60" />
                  Details unlock {GENESIS_LAUNCH_LABEL}.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Pool size" value={formatUsd(asset.poolSize)} />
                  <Stat label="Min entry" value={formatUsd(asset.minEntry)} />
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-oasis-bg px-4 py-3 text-xs text-oasis-muted">
                <Package size={15} className="flex-none" />
                Custody and authentication details are published before settlement.
              </div>

              <div className="mt-5 space-y-3">
                {locked ? (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-oasis-bg py-3.5 text-sm font-semibold text-oasis-muted">
                    <Lock size={15} /> Locked
                  </div>
                ) : !wallet.isConnected ? (
                  <ConnectButton variant="cyan" className="w-full py-3.5 text-[15px]" />
                ) : !wallet.isCorrectChain ? (
                  <motion.button
                    onClick={wallet.switchToRobinhoodChain}
                    disabled={wallet.isSwitching}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-oasis-ink py-3.5 text-[15px] font-bold text-aqua-400 transition hover:brightness-110 disabled:opacity-70"
                  >
                    {wallet.isSwitching && <Loader2 size={16} className="animate-spin" />}
                    Switch to Robinhood Chain
                  </motion.button>
                ) : live ? (
                  <ContributePanel asset={asset} wallet={wallet} />
                ) : joined ? (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-aqua-50 py-3.5 text-sm font-semibold text-aqua-700">
                    <Check size={17} /> Joined Waitlist
                  </div>
                ) : (
                  <motion.button
                    onClick={handleJoinWaitlist}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-aqua-400 py-3.5 text-[15px] font-bold text-oasis-ink transition hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    Join Waitlist
                  </motion.button>
                )}
                {wallet.error && (
                  <p className="rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">
                    {wallet.error}
                  </p>
                )}

                <button
                  onClick={() => setWatching((v) => !v)}
                  className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold transition ${
                    watching
                      ? "border-rose-200 bg-rose-50 text-rose-500"
                      : "border-oasis-line bg-white text-oasis-ink hover:bg-oasis-bg"
                  }`}
                >
                  <Heart size={16} fill={watching ? "currentColor" : "none"} />
                  {watching ? "In your watchlist" : "Add to Watchlist"}
                </button>
              </div>

              {locked ? (
                <p className="mt-4 text-center text-xs leading-relaxed text-oasis-muted">
                  Genesis Drop launches {GENESIS_LAUNCH_LABEL}.
                </p>
              ) : live ? (
                <p className="mt-4 text-center text-xs leading-relaxed text-oasis-muted">
                  Pool is live. Contributions settle onchain on Robinhood Chain.
                </p>
              ) : (
                <p className="mt-4 text-center text-xs leading-relaxed text-oasis-muted">
                  Genesis pool opens {GENESIS_LAUNCH_LABEL}.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------- pool summary */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Pool" title="Pool summary" />
        <div className={`grid grid-cols-2 gap-3 ${locked ? "sm:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-4"}`}>
          {(locked
            ? [
                { label: "Status", value: "Locked" },
                { label: "Details unlock", value: GENESIS_LAUNCH_LABEL },
                { label: "Category", value: asset.category },
                { label: "Chain", value: "Robinhood" },
              ]
            : [
                { label: "Pool size", value: formatUsd(asset.poolSize) },
                { label: "Min entry", value: formatUsd(asset.minEntry) },
                live
                  ? { label: "Status", value: "Live" }
                  : { label: "Launch date", value: GENESIS_LAUNCH_LABEL },
                { label: "Chain", value: "Robinhood" },
              ]
          ).map((c) => (
            <div key={c.label} className="rounded-2xl border border-oasis-line bg-white p-4 shadow-soft">
              <p className="text-[10px] uppercase tracking-wide text-oasis-muted">{c.label}</p>
              {c.label === "Chain" ? (
                <div className="mt-1.5">
                  <RobinhoodChainBadge variant="light" size="sm" pill={false} label="Robinhood" />
                </div>
              ) : (
                <p className="mt-1 text-[15px] font-bold text-oasis-ink">{c.value}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- asset thesis */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Thesis" title="Why this asset" />
        <div className="grid gap-4 md:grid-cols-2">
          <ThesisCard icon={Sparkles} title="Collector demand" body={asset.thesis.collectorDemand} />
          <ThesisCard icon={Gauge} title="Scarcity" body={asset.thesis.scarcity} />
          <ThesisCard icon={TrendingUp} title="Secondary-market interest" body={asset.thesis.secondaryMarket} />
          <ThesisCard icon={ShieldCheck} title="Condition" body={asset.thesis.condition} />
        </div>
        <p className="mt-4 text-xs text-oasis-muted">
          This describes collector context only. It is not a prediction or promise of appreciation.
        </p>
      </Section>

      {/* --------------------------------------------- authentication & docs */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Provenance" title="Authentication & documents" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {asset.documents.map((d) => {
            const Icon = DOC_ICONS[d.name] || FileText;
            const isRestricted = d.status === "Restricted";
            return (
              <div
                key={d.name}
                className="flex flex-col rounded-2xl border border-oasis-line bg-white p-5 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-oasis-bg text-oasis-ink">
                    <Icon size={18} />
                  </div>
                  {isRestricted && <Lock size={14} className="text-oasis-muted" />}
                </div>
                <h3 className="mt-4 text-sm font-bold text-oasis-ink">{d.name}</h3>
                <p className="mt-0.5 text-xs text-oasis-muted">{d.hint}</p>
                <span
                  className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    isRestricted ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {d.status}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ------------------------------------------------------------ custody */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Custody" title="Storage & custody" />
        <div className="rounded-[1.5rem] border border-oasis-line bg-white p-7 shadow-soft">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-oasis-bg text-oasis-ink">
              <Package size={22} />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-oasis-muted">
                Custody and authentication details will be displayed before pool
                settlement. The intended model is insured, professional
                third-party storage appropriate to the asset category, with
                custody status confirmed before any pool settles.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------- pool activity */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Activity" title="Pool activity" />
        <div className="overflow-hidden rounded-[1.5rem] border border-oasis-line bg-white shadow-soft">
          <div className="hidden grid-cols-[1.4fr_2fr_1fr] gap-4 border-b border-oasis-line px-6 py-4 text-xs font-semibold uppercase tracking-wide text-oasis-muted sm:grid">
            <span>Wallet</span>
            <span>Action</span>
            <span className="text-right">Time</span>
          </div>
          {activity.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-2 px-6 py-4 text-sm sm:grid-cols-[1.4fr_2fr_1fr] sm:gap-4 sm:border-t sm:border-oasis-line"
            >
              <span className="font-mono text-xs font-semibold text-oasis-ink sm:text-sm">{row.wallet}</span>
              <span className="text-oasis-muted">{row.action}</span>
              <span className="text-oasis-muted sm:text-right">{row.time}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------- ownership calc */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Estimate" title="Ownership calculator" />
        {locked ? (
          <div className="rounded-[1.5rem] border border-oasis-line bg-white p-7 text-center shadow-soft">
            <p className="text-sm leading-relaxed text-oasis-muted">
              Pool economics will be published at Genesis launch on {GENESIS_LAUNCH_LABEL}.
            </p>
          </div>
        ) : (
          <OwnershipCalculator asset={asset} />
        )}
      </Section>

      {/* ---------------------------------------------------------- exit plan */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Liquidity" title="Potential exit paths" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXIT_PATHS.map((e) => {
            const Icon = EXIT_ICONS[e.icon] || Store;
            return (
              <div key={e.title} className="rounded-2xl border border-oasis-line bg-white p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-aqua-50 text-aqua-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-oasis-ink">{e.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-oasis-muted">{e.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-oasis-muted">
          These are possible mechanisms, not guaranteed outcomes. Exit availability and timing are not guaranteed.
        </p>
      </Section>

      {/* -------------------------------------------------------------- risks */}
      <Section className="mt-16">
        <ModuleHeading eyebrow="Risks" title="Understand the risks" />
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/60 p-7">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle size={18} />
            <h3 className="text-base font-bold">Please read before joining a pool</h3>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {risks.map((r) => (
              <li key={r} className="flex gap-3 text-sm leading-relaxed text-amber-900/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-oasis-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-oasis-ink">{value}</p>
    </div>
  );
}

function ThesisCard({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-oasis-line bg-white p-6 shadow-soft">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-aqua-50 text-aqua-600">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-bold text-oasis-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-oasis-muted">{body}</p>
      </div>
    </div>
  );
}

function OwnershipCalculator({ asset }) {
  const [amount, setAmount] = useState(asset.minEntry);
  const clamped = Math.max(0, Math.min(Number(amount) || 0, asset.poolSize));
  const ownership = (clamped / asset.poolSize) * 100;

  return (
    <div className="grid gap-5 rounded-[1.5rem] border border-oasis-line bg-white p-7 shadow-soft lg:grid-cols-[1fr_1.2fr]">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-oasis-ink">
          <Calculator size={16} className="text-aqua-600" /> Contribution amount
        </label>
        <div className="relative mt-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-oasis-muted">$</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-2xl border border-oasis-line bg-oasis-bg/60 py-3.5 pl-8 pr-4 text-lg font-bold text-oasis-ink outline-none transition focus:border-aqua-300 focus:ring-2 focus:ring-aqua-100"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[asset.minEntry, 500, 1000, 2500].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className="pill border border-oasis-line bg-white px-3 py-1.5 text-xs font-semibold text-oasis-ink transition hover:bg-oasis-bg"
            >
              {formatUsd(v)}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-oasis-muted">
          Estimate only. Final ownership is confirmed after pool settlement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CalcOut label="Estimated ownership" value={`${ownership.toFixed(2)}%`} accent />
        <CalcOut label="Contribution" value={formatUsd(clamped)} />
        <CalcOut label="Pool size" value={formatUsd(asset.poolSize)} />
      </div>
    </div>
  );
}

function CalcOut({ label, value, accent }) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? "bg-aqua-400" : "bg-oasis-bg"}`}>
      <p className={`text-[11px] uppercase tracking-wide ${accent ? "text-oasis-ink/60" : "text-oasis-muted"}`}>
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-oasis-ink">{value}</p>
    </div>
  );
}
