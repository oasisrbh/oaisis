// ---------------------------------------------------------------------------
// Oasis — pool positions
// Local record of confirmed onchain contributions, keyed by wallet address.
// Every entry corresponds to a real transaction on Robinhood Chain (the tx
// hash is stored and linked to the explorer). This is the client-side index
// of a user's contributions until pool contracts and a backend indexer exist.
// ---------------------------------------------------------------------------

const KEY = "oasis:positions:v1";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY)) || {};
  } catch (_) {
    return {};
  }
}

function writeAll(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch (_) {}
}

function normalize(address) {
  return address ? address.toLowerCase() : null;
}

// Records a confirmed contribution. `amountEth` is a decimal string,
// `txHash` the confirmed transaction hash on Robinhood Chain.
export function recordContribution(address, poolId, { amountEth, txHash, chainId }) {
  const key = normalize(address);
  if (!key || !poolId || !txHash) return;
  const all = readAll();
  const list = all[key] || [];
  // A tx hash is unique — never double-record the same confirmation.
  if (list.some((p) => p.txHash === txHash)) return;
  list.push({ poolId, amountEth, txHash, chainId, at: new Date().toISOString() });
  all[key] = list;
  writeAll(all);
}

export function getPositions(address) {
  const key = normalize(address);
  if (!key) return [];
  return readAll()[key] || [];
}

export function getPoolPositions(address, poolId) {
  return getPositions(address).filter((p) => p.poolId === poolId);
}

// Total ETH contributed by this wallet to one pool.
export function getPoolContributionEth(address, poolId) {
  return getPoolPositions(address, poolId).reduce(
    (sum, p) => sum + (Number(p.amountEth) || 0),
    0
  );
}
