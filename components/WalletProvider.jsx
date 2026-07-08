"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Wallet context.
// Structured so `connect()` can be swapped for a real
// Robinhood Chain / wallet-provider flow later without touching the UI.
// ---------------------------------------------------------------------------

const FULL_ADDRESS = "0x7A2f91b3c8D4e5F67890123456789abcD9E4c";

export function shortenAddress(a) {
  if (!a) return "";
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Persist the connection across route changes / reloads
  useEffect(() => {
    try {
      if (localStorage.getItem("oasis:wallet")) setConnected(true);
    } catch (_) {}
  }, []);

  const connect = useCallback(async () => {
    setConnecting(true);
    // Brief handshake delay for a premium connect feel
    await new Promise((r) => setTimeout(r, 900));
    setConnected(true);
    setConnecting(false);
    try {
      localStorage.setItem("oasis:wallet", FULL_ADDRESS);
    } catch (_) {}
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    try {
      localStorage.removeItem("oasis:wallet");
    } catch (_) {}
  }, []);

  const fullAddress = FULL_ADDRESS;
  const address = shortenAddress(FULL_ADDRESS); // "0x7A2f…9E4c"

  return (
    <WalletContext.Provider
      value={{ connected, connecting, address, fullAddress, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
