"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AssetCard from "@/components/AssetCard";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { genesisDrops, GENESIS_LAUNCH_LABEL } from "@/lib/data";

const TABS = ["Featured", "Watches", "Sneakers", "Bags", "Collectibles"];

export default function LatestDrops() {
  const [tab, setTab] = useState("Featured");

  const filtered = useMemo(() => {
    if (tab === "Featured") return genesisDrops;
    return genesisDrops.filter((a) => a.category === tab);
  }, [tab]);

  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;
  const stats = [
    { value: genesisDrops.length, label: "Genesis pools" },
    { value: launchingCount, label: "Launching soon" },
    { value: lockedCount, label: "Locked" },
    { value: "Robinhood", label: "Chain", chain: true },
  ];

  return (
    <section className="container-oasis mt-28">
      {/* Heading */}
      <div className="max-w-2xl">
        <span className="pill gap-1.5 bg-aqua-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-oasis-ink">
          <Sparkles size={12} /> Limited Genesis Drops
        </span>
        <h2 className="mt-4 text-[30px] leading-[1.08] h-display sm:text-[38px]">
          First Oasis pools
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-oasis-muted">
          First Genesis pool launches {GENESIS_LAUNCH_LABEL}. Three locked drops
          unlock after launch. Built for rare asset ownership on Robinhood Chain.
        </p>
      </div>

      {/* Scarcity stats row */}
      <div className="mt-7 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-oasis-line bg-white/70 px-4 py-3">
            {s.chain ? (
              <div className="pt-0.5">
                <RobinhoodChainBadge variant="light" size="md" pill={false} label="Robinhood" />
              </div>
            ) : (
              <p className="text-xl font-extrabold tracking-tight text-oasis-ink">{s.value}</p>
            )}
            <p className="mt-0.5 text-xs text-oasis-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === c ? "text-oasis-ink" : "text-oasis-muted hover:text-oasis-ink"
            }`}
          >
            {tab === c && (
              <motion.span
                layoutId="drops-tab"
                className="absolute inset-0 -z-10 rounded-full bg-aqua-400"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {c}
          </button>
        ))}
      </div>

      {/* Genesis grid — 4 desktop / 2x2 tablet / 1 mobile */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((a, i) => (
          <AssetCard key={a.id} asset={a} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[1.5rem] border border-dashed border-oasis-line py-16 text-center">
          <p className="text-sm text-oasis-muted">
            Genesis drops in this category open soon.
          </p>
        </div>
      )}

      {/* Waitlist CTA */}
      <div className="mt-10 flex justify-center">
        <button
          className="pill gap-2 bg-oasis-ink px-5 py-3 text-sm font-semibold text-white transition hover:text-aqua-400"
        >
          Join waitlist <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
