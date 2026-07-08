// ---------------------------------------------------------------------------
// Local waitlist store.
// There is no backend yet — this persists "joined waitlist" state per wallet
// address in localStorage until a real API/contract is wired up. It is a
// real, functioning local record (not a UI-only illustration): once a
// connected wallet joins a pool's waitlist, that state survives reloads and
// is reflected in the portfolio.
// ---------------------------------------------------------------------------

const KEY = "oasis:waitlist:v1";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function writeAll(data) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch (_) {}
}

function normalize(address) {
  return address ? address.toLowerCase() : null;
}

export function hasJoinedWaitlist(address, poolId) {
  const key = normalize(address);
  if (!key) return false;
  const all = readAll();
  return !!all[key]?.includes(poolId);
}

export function joinWaitlist(address, poolId) {
  const key = normalize(address);
  if (!key) return;
  const all = readAll();
  const entries = new Set(all[key] || []);
  entries.add(poolId);
  all[key] = Array.from(entries);
  writeAll(all);
}

export function leaveWaitlist(address, poolId) {
  const key = normalize(address);
  if (!key) return;
  const all = readAll();
  all[key] = (all[key] || []).filter((id) => id !== poolId);
  writeAll(all);
}

export function getJoinedPoolIds(address) {
  const key = normalize(address);
  if (!key) return [];
  const all = readAll();
  return all[key] || [];
}
