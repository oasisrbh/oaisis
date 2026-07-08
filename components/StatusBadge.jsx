import { Circle } from "lucide-react";

// Robinhood-inspired badge system: lime / black / grey.
const STYLES = {
  Live: "bg-aqua-400 text-oasis-ink",
  "Launching Soon": "bg-aqua-400 text-oasis-ink",
  "Opening Soon": "bg-oasis-ink text-aqua-400",
  Locked: "bg-oasis-sand text-oasis-muted",
  Closed: "bg-oasis-sand text-oasis-muted",
  Exited: "bg-oasis-ink text-aqua-400",
};

// dot color (used for the muted variants that need a lime cue)
const DOT = {
  Locked: "#9a9a90",
  Closed: "#9a9a90",
};

// `label` optionally overrides the displayed text while `status` still
// drives the style lookup — e.g. status="Launching Soon" label="Launching July 26, 2026".
export default function StatusBadge({ status, label, className = "" }) {
  const showDot = DOT[status];
  return (
    <span
      className={`pill gap-1.5 px-3 py-1 text-xs ${STYLES[status] || "bg-oasis-sand text-oasis-muted"} ${className}`}
    >
      {showDot && <Circle size={7} fill={showDot} strokeWidth={0} />}
      {label || status}
    </span>
  );
}
