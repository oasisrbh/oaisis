"use client";

import { motion } from "framer-motion";

// Lightweight SVG donut. `segments` = [{ label, value, color }].
export default function DonutChart({ segments, size = 180, stroke = 22, centerLabel, centerSub, dark = false }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={dark ? "rgba(255,255,255,0.10)" : "#eef0f4"}
          strokeWidth={stroke}
        />
        {segments.map((seg, i) => {
          const frac = seg.value / total;
          const dash = frac * c;
          const el = (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c - dash}`}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: -offset }}
              transition={{ duration: 1, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <span className={`text-xl font-extrabold ${dark ? "text-white" : "text-oasis-ink"}`}>
              {centerLabel}
            </span>
          )}
          {centerSub && (
            <span className={`text-xs ${dark ? "text-white/50" : "text-oasis-muted"}`}>
              {centerSub}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
