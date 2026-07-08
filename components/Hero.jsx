"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import WalletCard from "@/components/WalletCard";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { Dots, Glow } from "@/components/Decor";
import { featured, getAsset, formatUsd, fundedPercentage } from "@/lib/data";

export default function Hero() {
  const [i, setI] = useState(0);
  const item = featured[i];
  const asset = getAsset(item.id);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % featured.length), 5500);
    return () => clearInterval(t);
  }, []);

  const meta = [
    { label: "Pool size", value: formatUsd(asset.poolSize) },
    { label: "Min entry", value: formatUsd(asset.minEntry) },
    { label: "Funding", value: `${fundedPercentage(asset)}%` },
    { label: "Chain", value: "Robinhood" },
  ];

  return (
    <section className="container-oasis pt-8 lg:pt-12">
      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        {/* Featured hero card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br ${item.gradient} p-8 shadow-card sm:p-10`}
        >
          <Dots className="absolute right-8 top-8 hidden h-28 w-44 opacity-50 sm:block" />
          <Glow color={item.accent} className="-left-16 -top-20" size={280} opacity={0.16} />
          {/* faint oversized brand watermark behind the featured product */}
          <Image
            src="/brand/oasis-icon.png"
            alt=""
            aria-hidden
            width={447}
            height={472}
            className="pointer-events-none absolute left-[6%] top-1/2 hidden w-[38%] max-w-[360px] -translate-y-1/2 opacity-[0.06] sm:block"
          />

          <div className="relative grid items-center gap-8 sm:grid-cols-[0.9fr_1.1fr]">
            {/* Oversized product in a glass display frame */}
            <div className="order-2 flex justify-center sm:order-1">
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-2xl"
                  style={{ backgroundColor: item.accent, opacity: 0.22 }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="animate-floaty"
                  >
                    <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/40 shadow-[0_30px_70px_-30px_rgba(14,21,38,0.5)] ring-1 ring-white/50 backdrop-blur-md sm:h-72 sm:w-72">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={`${item.tag} product photograph`}
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 sm:order-2">
              <div className="flex flex-wrap items-center gap-2">
                <RobinhoodChainBadge
                  variant="lime"
                  size="md"
                  label="Launching on Robinhood Chain"
                  className="uppercase tracking-wide"
                />
                <span className="pill gap-1.5 bg-oasis-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-aqua-400">
                  <Sparkles size={12} /> Featured Pool
                </span>
              </div>

              <h1 className="mt-5 text-balance text-[36px] leading-[1.02] h-display sm:text-[46px]">
                Own rare luxury assets fractionally
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-oasis-ink/70">
                Join onchain pools for watches, sneakers, bags, and collectible
                RWAs — curated, verified, and tracked from one dashboard.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/drops"
                  className="pill gap-2 bg-aqua-400 px-5 py-3 text-sm font-bold text-oasis-ink transition hover:-translate-y-0.5 hover:shadow-glow"
                >
                  Explore Drops <ArrowRight size={16} />
                </Link>
                <Link
                  href="#how-it-works"
                  className="pill gap-2 border border-oasis-charcoal bg-oasis-ink px-5 py-3 text-sm font-semibold text-white transition hover:text-aqua-400"
                >
                  <Layers size={15} /> How it works
                </Link>
              </div>

              {/* Metadata row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-7 grid max-w-md grid-cols-4 gap-2 rounded-2xl border border-white/60 bg-white/50 p-3 backdrop-blur"
                >
                  {meta.map((m) => (
                    <div key={m.label} className="px-1 text-center sm:text-left">
                      <p className="text-[10px] uppercase tracking-wide text-oasis-ink/45">
                        {m.label}
                      </p>
                      {m.label === "Chain" ? (
                        <RobinhoodChainBadge
                          variant="light"
                          size="sm"
                          pill={false}
                          label="Robinhood"
                          className="mt-0.5"
                        />
                      ) : (
                        <p className="mt-0.5 text-sm font-bold text-oasis-ink">{m.value}</p>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* carousel dots */}
          <div className="absolute bottom-6 right-8 flex gap-1.5">
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-6 bg-oasis-ink/70" : "w-2 bg-oasis-ink/25"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Wallet card */}
        <WalletCard />
      </div>
    </section>
  );
}
