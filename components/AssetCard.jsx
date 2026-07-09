"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Calendar, Zap } from "lucide-react";
import AssetVisual from "@/components/AssetVisual";
import StatusBadge from "@/components/StatusBadge";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { formatUsd, GENESIS_LAUNCH_LABEL } from "@/lib/data";

// Chain badge that fades in on card hover (kept out of the resting layout).
function HoverChainBadge() {
  return (
    <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <RobinhoodChainBadge variant="dark" size="sm" label="Robinhood Chain" />
    </div>
  );
}

export default function AssetCard({ asset, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      {asset.isLocked ? <LockedCard asset={asset} /> : <OpenCard asset={asset} />}
    </motion.div>
  );
}

// ---------------------------------------------------------------- open card
function OpenCard({ asset }) {
  return (
    <Link
      href={`/drops/${asset.id}`}
      className="card-hover group flex h-full flex-col rounded-[1.75rem] border border-oasis-line bg-white p-3 shadow-soft hover:border-aqua-400/70"
    >
      <div className="relative">
        <AssetVisual
          icon={asset.icon}
          image={asset.image}
          brand={asset.brand}
          accent={asset.accent}
          gradient={asset.gradient}
          size="lg"
        />
        <div className="absolute right-3 top-3">
          <StatusBadge status={asset.status} className="bg-white/85 backdrop-blur" />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="pill bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-oasis-ink/70 backdrop-blur">
            {asset.category}
          </span>
        </div>
        <HoverChainBadge />
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-1 pt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[17px] font-bold leading-tight text-oasis-ink">{asset.name}</h3>
          <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-oasis-bg text-oasis-muted transition-all group-hover:bg-aqua-400 group-hover:text-oasis-ink">
            <ArrowUpRight size={15} />
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-oasis-muted">
          {asset.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-oasis-bg/70 p-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Pool size</p>
            <p className="mt-0.5 text-sm font-bold text-oasis-ink">{formatUsd(asset.poolSize)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-oasis-muted">Min entry</p>
            <p className="mt-0.5 text-sm font-bold text-oasis-ink">{formatUsd(asset.minEntry)}</p>
          </div>
        </div>

        {asset.status === "Live" ? (
          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-aqua-50 px-3 py-2 text-xs font-semibold text-aqua-700">
            <Zap size={13} />
            {asset.reservedUsd
              ? `Live — ${Math.round((asset.reservedUsd / asset.poolSize) * 100)}% committed`
              : "Live — accepting contributions"}
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-aqua-50 px-3 py-2 text-xs font-semibold text-aqua-700">
            <Calendar size={13} /> Launching {GENESIS_LAUNCH_LABEL}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-oasis-line pt-4">
          <span className="text-xs text-oasis-muted">Genesis pool</span>
          <span className="pill bg-oasis-sand px-3.5 py-1.5 text-xs font-semibold text-oasis-ink transition-colors group-hover:bg-aqua-400 group-hover:text-oasis-ink">
            {asset.status === "Live" ? "Contribute" : "View Pool"}
          </span>
        </div>
      </div>
    </Link>
  );
}

// -------------------------------------------------------------- locked card
function LockedCard({ asset }) {
  return (
    <div className="card-hover group relative flex h-full cursor-default flex-col rounded-[1.75rem] border border-oasis-line bg-white p-3 shadow-soft transition-shadow hover:border-aqua-400/70 hover:shadow-glow">
      {/* Image + locked overlay */}
      <div className="relative">
        <AssetVisual
          icon={asset.icon}
          image={asset.image}
          brand={asset.brand}
          accent={asset.accent}
          gradient={asset.gradient}
          size="lg"
        />
        {/* dark translucent overlay conceals the product until launch */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-oasis-ink/72 text-center backdrop-blur-md">
          <Image
            src="/brand/oasis-icon.png"
            alt=""
            aria-hidden
            width={447}
            height={472}
            className="pointer-events-none absolute inset-0 m-auto h-[68%] w-auto opacity-[0.08]"
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-aqua-400 text-oasis-ink shadow-[0_0_28px_rgba(200,255,0,0.5)]">
            <Lock size={19} />
          </span>
          <p className="mt-3 text-sm font-bold text-white">Locked Drop</p>
          <p className="mt-0.5 text-xs text-white/60">
            <span className="group-hover:hidden">Details unlock at Genesis launch</span>
            <span className="hidden font-semibold text-aqua-300 group-hover:inline">Coming soon</span>
          </p>
        </div>
        {/* lime lock badge */}
        <div className="absolute right-3 top-3">
          <span className="pill gap-1.5 bg-aqua-400 px-2.5 py-1 text-[11px] font-bold text-oasis-ink">
            <Lock size={11} /> Locked
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="pill bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-oasis-ink/70 backdrop-blur">
            {asset.category}
          </span>
        </div>
        <HoverChainBadge />
      </div>

      {/* Body — name teased, no pool numbers until confirmed */}
      <div className="flex flex-1 flex-col px-2.5 pb-1 pt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[17px] font-bold leading-tight text-oasis-ink">{asset.name}</h3>
          <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-oasis-bg text-oasis-muted">
            <Lock size={13} />
          </span>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-oasis-muted">
          {asset.description}
        </p>

        <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-oasis-bg/70 px-3 py-2.5 text-xs font-semibold text-oasis-muted">
          <Calendar size={13} /> Details unlock {GENESIS_LAUNCH_LABEL}
        </div>

        {/* Disabled CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-oasis-line pt-4">
          <span className="text-xs text-oasis-muted">Genesis drop</span>
          <span
            aria-disabled="true"
            className="pill pointer-events-none gap-1.5 bg-oasis-ink/[0.06] px-3.5 py-1.5 text-xs font-semibold text-oasis-muted"
          >
            <Lock size={12} /> Locked
          </span>
        </div>
      </div>
    </div>
  );
}
