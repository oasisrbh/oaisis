"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Check, ChevronDown, Sparkles } from "lucide-react";
import AssetCard from "@/components/AssetCard";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { genesisDrops } from "@/lib/data";

const CATEGORY_FILTERS = ["All", "Watches", "Sneakers", "Bags"];
const STATUS_FILTERS = ["All", "Launching Soon", "Locked"];
const TYPE_FILTERS = ["All", ...Array.from(new Set(genesisDrops.map((a) => a.assetType)))];
const SORTS = ["Featured", "Launching first", "Locked first"];

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-oasis-muted">{title}</h4>
      <div className="mt-3 flex flex-col gap-1">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                active ? "bg-oasis-bg font-semibold text-oasis-ink" : "text-oasis-muted hover:bg-oasis-bg/60"
              }`}
            >
              {opt}
              {active && <Check size={15} className="text-aqua-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ExploreClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let list = [...genesisDrops];
    if (cat !== "All") list = list.filter((a) => a.category === cat);
    if (status !== "All")
      list = list.filter((a) => (status === "Locked" ? a.isLocked : a.status === status));
    if (type !== "All") list = list.filter((a) => a.assetType === type);

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(s) ||
          a.brand.toLowerCase().includes(s) ||
          a.category.toLowerCase().includes(s)
      );
    }

    if (sort === "Launching first") list.sort((a, b) => Number(a.isLocked) - Number(b.isLocked));
    else if (sort === "Locked first") list.sort((a, b) => Number(b.isLocked) - Number(a.isLocked));
    // "Featured" keeps the curated genesis order
    return list;
  }, [q, cat, status, type, sort]);

  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;
  const stats = [
    { value: genesisDrops.length, label: "Genesis pools" },
    { value: launchingCount, label: "Launching soon" },
    { value: lockedCount, label: "Locked" },
    { value: "Robinhood", label: "Chain", chain: true },
  ];

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Category" options={CATEGORY_FILTERS} value={cat} onChange={setCat} />
      <FilterGroup title="Status" options={STATUS_FILTERS} value={status} onChange={setStatus} />
      <FilterGroup title="Asset type" options={TYPE_FILTERS} value={type} onChange={setType} />
    </div>
  );

  return (
    <div className="container-oasis pt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] border border-oasis-line bg-white p-8 shadow-soft sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-aqua-200/50 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="pill gap-1.5 bg-aqua-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-oasis-ink">
            <Sparkles size={12} /> Limited Genesis Drops
          </span>
          <h1 className="mt-4 text-balance text-[34px] leading-[1.05] h-display sm:text-[44px]">
            Genesis RWA pools
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-oasis-muted">
            One pool launching soon. Three locked drops. Rare assets prepared for fractional
            ownership on Robinhood Chain.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-oasis-line bg-oasis-bg/60 p-4">
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
      </motion.div>

      {/* Search + sort */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-oasis-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Genesis pools"
            className="w-full rounded-full border border-oasis-line bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-aqua-300 focus:ring-2 focus:ring-aqua-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="pill gap-2 border border-oasis-line bg-white px-4 py-2.5 text-sm font-medium text-oasis-ink lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-full border border-oasis-line bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-oasis-ink outline-none transition focus:border-aqua-300"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>Sort: {s}</option>
              ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-oasis-muted" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft">
            {filters}
          </div>
        </aside>

        {showFilters && (
          <div className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft lg:hidden">
            {filters}
          </div>
        )}

        <div>
          <div className="mb-6 flex items-center gap-3">
            <p className="text-sm font-semibold text-oasis-ink">
              {results.length} Genesis {results.length === 1 ? "pool" : "pools"}
            </p>
            <span className="pill bg-aqua-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-oasis-ink">
              Limited launch set
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((a, i) => (
              <AssetCard key={a.id} asset={a} index={i} />
            ))}
          </div>

          {results.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-oasis-line py-20 text-center">
              <p className="text-sm text-oasis-muted">No Genesis pools match these filters.</p>
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-oasis-muted">
              More pools unlock after launch.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
