"use client";

import { useEffect, useState } from "react";

// ETH/USD spot price for display estimates (contribution ↔ pool-size math).
// Contributions themselves are denominated in ETH onchain; if the price
// feed is unreachable the UI simply omits USD estimates rather than guessing.
let cachedPrice = null;

export function useEthPrice() {
  const [price, setPrice] = useState(cachedPrice);

  useEffect(() => {
    if (cachedPrice !== null) return;
    let cancelled = false;
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const p = data?.ethereum?.usd;
        if (!cancelled && typeof p === "number" && p > 0) {
          cachedPrice = p;
          setPrice(p);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return price;
}
