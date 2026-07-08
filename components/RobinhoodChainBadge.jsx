"use client";

// Logo-backed "Robinhood Chain" badge.
// Uses the Robinhood feather symbol as a recognizable chain marker.
// NOTE: this communicates that Oasis is launching/building on Robinhood Chain —
// it is not a claim of official partnership, endorsement, or a Robinhood product.

const SYMBOL = {
  light: "/robinhood/symbol-black.svg",
  lime: "/robinhood/symbol-black.svg",
  dark: "/robinhood/symbol-neon.svg",
};

const SIZE = {
  sm: { pad: "px-2.5 py-1", text: "text-[11px]", gap: "gap-1.5", logo: 12 },
  md: { pad: "px-3 py-1.5", text: "text-xs", gap: "gap-1.5", logo: 14 },
  lg: { pad: "px-4 py-2", text: "text-sm", gap: "gap-2", logo: 17 },
};

const PILL = {
  light: "border border-oasis-line bg-white text-oasis-ink",
  lime: "bg-aqua-400 text-oasis-ink",
  dark: "border border-aqua-400/25 bg-oasis-darkcard text-white shadow-[0_0_22px_-8px_rgba(200,255,0,0.6)]",
};

// symbol aspect ratio (viewBox 115.87 x 149.53)
const RATIO = 115.87 / 149.53;

export default function RobinhoodChainBadge({
  variant = "light",
  size = "md",
  showText = true,
  pill = true,
  label = "Robinhood Chain",
  className = "",
}) {
  const s = SIZE[size] || SIZE.md;
  const h = s.logo;
  const w = Math.round(h * RATIO);
  const textColor = variant === "dark" ? "text-white" : "text-oasis-ink";

  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SYMBOL[variant] || SYMBOL.light}
      alt="Robinhood Chain"
      width={w}
      height={h}
      style={{ height: h, width: w }}
      className="shrink-0"
    />
  );

  if (!pill) {
    return (
      <span
        className={`inline-flex items-center ${s.gap} ${s.text} font-semibold ${textColor} ${className}`}
      >
        {logo}
        {showText && <span className="whitespace-nowrap">{label}</span>}
      </span>
    );
  }

  return (
    <span
      className={`pill ${s.pad} ${s.text} ${s.gap} font-semibold ${PILL[variant] || PILL.light} ${className}`}
    >
      {logo}
      {showText && <span className="whitespace-nowrap">{label}</span>}
    </span>
  );
}
