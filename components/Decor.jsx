"use client";

import { motion } from "framer-motion";

// Faint dotted panel — subtle luxury texture.
export function Dots({ className = "", color = "rgba(14,21,38,0.10)" }) {
  return (
    <div
      className={`dots pointer-events-none ${className}`}
      style={{ color }}
      aria-hidden="true"
    />
  );
}

// Soft radial glow blob, slowly drifting.
export function Glow({ color = "#c8ff00", className = "", size = 320, opacity = 0.22 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl animate-drift ${className}`}
      style={{ width: size, height: size, backgroundColor: color, opacity }}
    />
  );
}

// Section heading block: eyebrow + display title + optional lead.
export function SectionHeading({ eyebrow, title, lead, align = "left", className = "" }) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-balance text-[30px] leading-[1.08] h-display sm:text-[38px]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[15px] leading-relaxed text-oasis-muted">{lead}</p>
      )}
    </div>
  );
}

// Animated mini "ledger" rows for the chain section visual.
export function MiniLedger({ rows }) {
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-[13px]"
              style={{ backgroundColor: `${r.color}22`, color: r.color }}
            >
              {r.badge}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{r.title}</p>
              <p className="text-xs text-white/45">{r.meta}</p>
            </div>
          </div>
          <span className="text-xs font-medium text-white/60">{r.time}</span>
        </motion.div>
      ))}
    </div>
  );
}
