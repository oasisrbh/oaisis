"use client";

import { useState, useEffect } from "react";

// Premium launch countdown. Client-only to avoid hydration mismatch:
// remaining is null on the server + first client render, then filled in a
// useEffect and updated every second. Interval is cleared on unmount.
function diff(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n) => String(n).padStart(2, "0");

export default function CountdownTimer({ targetDate, label = "Launching in", className = "" }) {
  const [t, setT] = useState(null); // null until mounted
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = diff(targetDate);
      if (!d) {
        setDone(true);
        setT(null);
        return true;
      }
      setT(d);
      return false;
    };
    if (tick()) return;
    const id = setInterval(() => {
      if (tick()) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (done) {
    return (
      <div
        className={`rounded-2xl border border-aqua-400/40 bg-oasis-sand/70 px-4 py-3 text-center text-sm font-bold text-oasis-ink shadow-[0_0_24px_-10px_rgba(200,255,0,0.5)] ${className}`}
      >
        Pool opening soon
      </div>
    );
  }

  const units = [
    { label: "Days", value: t ? pad(t.days) : "--" },
    { label: "Hours", value: t ? pad(t.hours) : "--" },
    { label: "Min", value: t ? pad(t.minutes) : "--" },
    { label: "Sec", value: t ? pad(t.seconds) : "--" },
  ];

  return (
    <div
      className={`rounded-2xl border border-aqua-400/30 bg-oasis-sand/70 p-4 shadow-[0_0_28px_-12px_rgba(200,255,0,0.55)] ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-oasis-muted">
        {label}
      </p>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-xl border border-oasis-line bg-white py-2 text-center"
          >
            <div className="text-xl font-extrabold tabular-nums text-oasis-ink">{u.value}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-oasis-muted">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
