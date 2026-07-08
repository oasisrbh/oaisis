"use client";

import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmi";

// Wraps the app with real wagmi + react-query context.
// `initialState` (from cookies, read server-side in app/layout.jsx) lets the
// wallet connection survive a full page reload without a disconnected flash.
export default function Web3Provider({ children, initialState }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
