"use client";

import { motion } from "framer-motion";

// Animated funding progress bar: fills from 0 → value on mount / into view.
export default function ProgressBar({ value = 0, color = "#c8ff00", className = "" }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-oasis-line ${className}`}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
