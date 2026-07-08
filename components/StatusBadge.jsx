import { Circle } from "lucide-react";

// Robinhood-inspired badge system: lime / black / grey.
const STYLES = {
  Live: "bg-aqua-400 text-oasis-ink",
  "Launching Soon": "bg-aqua-400 text-oasis-ink",
  "Opening Soon": "bg-oasis-ink text-aqua-400",
  "Fully Allocated": "bg-oasis-sand text-oasis-ink",
  Closed: "bg-oasis-sand text-oasis-muted",
  Exited: "bg-oasis-ink text-aqua-400",
  // legacy
  "Sold Out": "bg-oasis-sand text-oasis-muted",
};

// dot color (used for the muted variants that need a lime cue)
const DOT = {
  "Fully Allocated": "#c8ff00",
  Closed: "#9a9a90",
  "Sold Out": "#9a9a90",
};

export default function StatusBadge({ status, className = "" }) {
  const showDot = DOT[status];
  return (
    <span
      className={`pill gap-1.5 px-3 py-1 text-xs ${STYLES[status] || "bg-oasis-sand text-oasis-muted"} ${className}`}
    >
      {showDot && <Circle size={7} fill={showDot} strokeWidth={0} />}
      {status}
    </span>
  );
}
