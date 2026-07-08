"use client";

import { Watch, Footprints, ShoppingBag, Shirt, Package, Gem } from "lucide-react";

// Maps an asset's `icon` key to a clean lucide glyph.
// Used as a graceful fallback when no photograph is available.
const ICONS = {
  watch: Watch,
  sneaker: Footprints,
  bag: ShoppingBag,
  shirt: Shirt,
  trunk: Package,
  gem: Gem,
};

export default function AssetVisual({
  icon = "gem",
  image,
  brand,
  accent = "#c8ff00",
  gradient = "from-[#e7fbf3] via-[#eafaf6] to-[#e9fbff]",
  size = "md",
  className = "",
}) {
  const Icon = ICONS[icon] || Gem;
  const dims = {
    sm: "h-32",
    md: "h-44",
    lg: "h-56",
    xl: "h-[440px]",
  }[size];
  const glyph = {
    sm: 40,
    md: 56,
    lg: 96,
    xl: 140,
  }[size];

  return (
    <div
      className={`group/vis relative flex ${dims} w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} ${className}`}
    >
      {/* Soft decorative blob (shows through when no image / while loading) */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{ backgroundColor: accent }}
      />

      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={brand ? `${brand} product photo` : "Asset photo"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/vis:scale-[1.04]"
          />
          {/* subtle top scrim so the brand label + badges stay legible */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
        </>
      ) : (
        <Icon
          size={glyph}
          strokeWidth={1.4}
          className="relative z-10 drop-shadow-sm"
          style={{ color: accent }}
        />
      )}

      {/* Brand wordmark */}
      {brand && (
        <span
          className={`absolute left-5 top-4 z-10 text-xs font-semibold uppercase tracking-[0.18em] ${
            image ? "text-white/85 drop-shadow" : "text-oasis-ink/40"
          }`}
        >
          {brand}
        </span>
      )}
    </div>
  );
}
