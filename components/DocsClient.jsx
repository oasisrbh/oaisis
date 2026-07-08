"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Info,
  Gem,
  Layers,
  Wallet,
  Search,
  ShieldCheck,
  Boxes,
  LineChart,
  Sparkles,
  ListChecks,
  Package,
  FileCheck2,
  FileText,
  Receipt,
  Eye,
  Activity,
  AlertTriangle,
  Lock,
  HelpCircle,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import { genesisDrops, GENESIS_LAUNCH_LABEL } from "@/lib/data";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "how-pools-work", label: "How pools work" },
  { id: "genesis-drops", label: "Genesis drops" },
  { id: "joining", label: "Joining a pool" },
  { id: "custody", label: "Custody & authentication" },
  { id: "wallet-chain", label: "Wallet & Robinhood Chain" },
  { id: "risks", label: "Risks" },
  { id: "faq", label: "FAQ" },
];

const QUICK = [
  { label: "Risk Disclosure", href: "/risk" },
  { label: "Robinhood Chain", href: "/robinhood-chain" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Drops", href: "/drops" },
];

const FAQS = [
  {
    q: "Is Oasis live yet?",
    a: `Yes. Oasis is live. The first Genesis pool opens ${GENESIS_LAUNCH_LABEL}.`,
  },
  {
    q: "What does a locked drop mean?",
    a: "Locked drops are Genesis assets with details revealed at or after launch.",
  },
  {
    q: "Are returns guaranteed?",
    a: "No. Asset values can fall, liquidity is not guaranteed, and Oasis does not guarantee resale value or profit.",
  },
  {
    q: "Is Oasis officially partnered with Robinhood?",
    a: "Oasis is built on Robinhood Chain, but does not claim official Robinhood partnership, endorsement, or affiliation unless separately announced.",
  },
  {
    q: "Where are assets stored?",
    a: "Custody and authentication details are published before pool settlement.",
  },
  {
    q: "What happens after I join a pool?",
    a: "After contribution and settlement, ownership details are expected to appear in the wallet-native portfolio dashboard.",
  },
  {
    q: "Can I sell my ownership?",
    a: "Potential exit paths may include resale, buyout proposals, direct asset sale, or future secondary transfer mechanisms. These are not guaranteed.",
  },
];

function LockedBadge() {
  return (
    <span className="pill gap-1 bg-oasis-sand px-2.5 py-1 text-[11px] font-semibold text-oasis-muted">
      <Lock size={11} /> Locked
    </span>
  );
}

export default function DocsClient() {
  const [active, setActive] = useState("overview");
  const [navOpen, setNavOpen] = useState(false);

  const launchingCount = genesisDrops.filter((a) => a.status === "Launching Soon").length;
  const lockedCount = genesisDrops.filter((a) => a.isLocked).length;

  const heroStats = [
    { value: genesisDrops.length, label: "Genesis pools" },
    { value: launchingCount, label: "Opens July 26" },
    { value: lockedCount, label: "Locked drops" },
    { value: "Robinhood", label: "Chain" },
  ];

  // Scroll-spy for active sidebar item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-oasis pb-8 pt-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-oasis-muted transition hover:text-oasis-ink"
      >
        <ArrowLeft size={16} /> Back to Oasis
      </Link>

      {/* Hero */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-oasis-line bg-white p-7 shadow-soft sm:p-10">
        <div className="relative">
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-aqua-200/40 blur-3xl" />
          <p className="eyebrow">Documentation</p>
          <h1 className="mt-3 text-balance text-[34px] leading-[1.05] h-display sm:text-[46px]">
            Oasis docs
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-oasis-muted">
            Everything you need to understand Oasis, Genesis pools, locked
            drops, wallet tracking, and Robinhood Chain.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-oasis-line bg-oasis-bg/60 p-4">
              <p className="text-2xl font-extrabold tracking-tight text-oasis-ink">{s.value}</p>
              <p className="mt-0.5 text-xs text-oasis-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile TOC */}
      <div className="mt-6 lg:hidden">
        <button
          onClick={() => setNavOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-oasis-line bg-white px-4 py-3 text-sm font-semibold text-oasis-ink shadow-soft"
        >
          On this page
          <ChevronDown size={18} className={`text-oasis-muted transition-transform ${navOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-2xl border border-oasis-line bg-white p-2 shadow-soft">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setNavOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-oasis-muted transition hover:bg-oasis-bg hover:text-oasis-ink"
                  >
                    {s.label}
                  </a>
                ))}
                <div className="my-1 h-px bg-oasis-line" />
                {QUICK.map((q) => (
                  <Link
                    key={q.label}
                    href={q.href}
                    onClick={() => setNavOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-oasis-muted transition hover:bg-oasis-bg hover:text-oasis-ink"
                  >
                    {q.label} <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[236px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.25rem] border border-oasis-line bg-white p-4 shadow-soft">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-oasis-muted">
              Docs
            </p>
            <nav className="mt-2 space-y-0.5">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block rounded-xl px-3 py-2 text-sm transition ${
                    active === s.id
                      ? "bg-oasis-ink font-semibold text-aqua-400"
                      : "text-oasis-muted hover:bg-oasis-bg hover:text-oasis-ink"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="my-3 h-px bg-oasis-line" />
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-oasis-muted">
              Quick links
            </p>
            <nav className="mt-2 space-y-0.5">
              {QUICK.map((q) => (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-oasis-muted transition hover:bg-oasis-bg hover:text-oasis-ink"
                >
                  {q.label}
                  <ArrowUpRight size={14} className="opacity-50" />
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-6">
          {/* 1. Overview */}
          <DocSection id="overview" eyebrow="Overview" icon={Info} title="What is Oasis?">
            <p className="text-[15px] leading-relaxed text-oasis-muted">
              Oasis is a premium platform for fractional ownership of real-world
              assets — luxury watches, rare sneakers, bags, and collectible RWAs.
              Each asset is placed into an onchain pool where members can own a
              percentage rather than buying the entire asset.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MiniCard icon={Gem} title="Rare assets" body="Watches, sneakers, bags, collectibles." />
              <MiniCard icon={Layers} title="Fractional pools" body="Own a percentage, not the whole asset." />
              <MiniCard icon={Wallet} title="Wallet-native tracking" body="Positions live with your wallet." />
              <MiniCard icon={Sparkles} title="Built on Robinhood Chain" body="A simple onchain ownership layer." />
            </div>
          </DocSection>

          {/* 2. How pools work */}
          <DocSection id="how-pools-work" eyebrow="Mechanics" icon={Boxes} title="How pools work">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StepCard n="01" icon={Search} title="Asset is sourced" body="A rare asset is identified and acquired." />
              <StepCard n="02" icon={ShieldCheck} title="Details are reviewed" body="Authenticity and condition are checked." />
              <StepCard n="03" icon={Boxes} title="Pool is created" body="Structured with a size and minimum entry." />
              <StepCard n="04" icon={LineChart} title="Ownership is tracked" body="Funding and ownership are visible onchain." />
            </div>
          </DocSection>

          {/* 3. Genesis drops */}
          <DocSection id="genesis-drops" eyebrow="Launch set" icon={Sparkles} title="Genesis drops">
            <p className="text-[15px] leading-relaxed text-oasis-muted">
              One Genesis pool opens {GENESIS_LAUNCH_LABEL}. Three locked drops
              unlock after launch.
            </p>
            <div className="mt-5 rounded-2xl border border-oasis-line bg-oasis-bg/50 p-5">
              <p className="text-sm font-bold text-oasis-ink">Genesis launch set</p>
              <div className="mt-3 space-y-2">
                {genesisDrops.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-oasis-line bg-white px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-oasis-ink">
                      {a.isLocked && <Lock size={13} className="text-oasis-muted" />}
                      {a.name}
                    </span>
                    {a.isLocked ? <LockedBadge /> : <StatusBadge status="Launching Soon" />}
                  </div>
                ))}
              </div>
            </div>
          </DocSection>

          {/* 4. Joining a pool */}
          <DocSection id="joining" eyebrow="Participation" icon={ListChecks} title="Joining a pool">
            <div className="space-y-3">
              <TimelineRow n="1" title="Before launch" body="Join the waitlist or add pools to your watchlist." />
              <TimelineRow n="2" title="At launch" body="The contribution flow opens and wallet connection is enabled." />
              <TimelineRow n="3" title="After joining" body="Your ownership appears in the portfolio dashboard." />
              <TimelineRow n="4" title="After settlement" body="Final ownership is confirmed." />
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1.5 text-[12px] font-semibold text-aqua-700">
              <Info size={13} /> Genesis pool opens {GENESIS_LAUNCH_LABEL}.
            </p>
          </DocSection>

          {/* 5. Custody & authentication */}
          <DocSection id="custody" eyebrow="Trust" icon={ShieldCheck} title="Custody & authentication">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DocCard icon={FileCheck2} title="Authentication report" status="Pending publication" />
              <DocCard icon={FileText} title="Condition report" status="Pending publication" />
              <DocCard icon={Package} title="Custody record" status="Pending publication" />
              <DocCard icon={Receipt} title="Purchase record" status="Restricted" />
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-oasis-muted">
              Custody and authentication details are published before pool settlement.
            </p>
          </DocSection>

          {/* 6. Wallet & Robinhood Chain */}
          <DocSection id="wallet-chain" eyebrow="Onchain" icon={Wallet} title="Wallet & Robinhood Chain">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[15px] leading-relaxed text-oasis-muted">
                Oasis is designed for wallet-native ownership tracking on Robinhood
                Chain.
              </p>
              <RobinhoodChainBadge variant="light" size="sm" label="Robinhood Chain" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MiniCard icon={Wallet} title="Connect wallet" />
              <MiniCard icon={Eye} title="Watch pools" />
              <MiniCard icon={LineChart} title="Track ownership" />
              <MiniCard icon={Activity} title="View activity" />
            </div>
            <p className="mt-4 rounded-2xl border border-oasis-line bg-oasis-bg/50 p-4 text-[13px] leading-relaxed text-oasis-muted">
              Oasis does not claim official Robinhood partnership, endorsement, or
              affiliation unless separately announced.
            </p>
          </DocSection>

          {/* 7. Risks */}
          <DocSection id="risks" eyebrow="Risk" icon={AlertTriangle} title="Risks">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle size={18} />
                <h3 className="text-base font-bold">Understand the risks</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-amber-900/80">
                Fractional ownership of real-world assets involves risk. Asset
                values may fall, liquidity is not guaranteed, exit timing may vary,
                and final pool terms should be reviewed before contributing.
              </p>
              <Link
                href="/risk"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 underline decoration-amber-400 underline-offset-2 hover:text-amber-900"
              >
                Read the Risk Disclosure <ArrowUpRight size={15} />
              </Link>
            </div>
          </DocSection>

          {/* 8. FAQ */}
          <DocSection id="faq" eyebrow="Questions" icon={HelpCircle} title="Frequently asked questions">
            <Faq items={FAQS} />
          </DocSection>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ building blocks
function DocSection({ id, eyebrow, icon: Icon, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-[1.5rem] border border-oasis-line bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-oasis-ink text-aqua-400">
            <Icon size={16} />
          </span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-oasis-ink">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

function MiniCard({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-oasis-line bg-oasis-bg/50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-oasis-ink text-aqua-400">
        <Icon size={17} />
      </div>
      <p className="mt-3 text-sm font-bold text-oasis-ink">{title}</p>
      {body && <p className="mt-1 text-[13px] leading-relaxed text-oasis-muted">{body}</p>}
    </div>
  );
}

function StepCard({ n, icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-oasis-line bg-oasis-bg/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-oasis-ink text-aqua-400">
          <Icon size={17} />
        </div>
        <span className="pill bg-aqua-400 px-2 py-0.5 text-[10px] font-bold text-oasis-ink">{n}</span>
      </div>
      <p className="mt-3 text-sm font-bold text-oasis-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-oasis-muted">{body}</p>
    </div>
  );
}

function DocCard({ icon: Icon, title, status }) {
  return (
    <div className="flex flex-col rounded-2xl border border-oasis-line bg-oasis-bg/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-oasis-ink shadow-soft">
          <Icon size={17} />
        </div>
        {status === "Restricted" && <Lock size={13} className="text-oasis-muted" />}
      </div>
      <p className="mt-3 text-sm font-bold text-oasis-ink">{title}</p>
      <span className="mt-2 inline-flex w-fit rounded-full bg-oasis-sand px-2 py-0.5 text-[10px] font-semibold text-oasis-muted">
        {status}
      </span>
    </div>
  );
}

function TimelineRow({ n, title, body }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-oasis-line bg-oasis-bg/50 p-4">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-aqua-400 text-sm font-bold text-oasis-ink">
        {n}
      </span>
      <div>
        <p className="text-sm font-bold text-oasis-ink">{title}</p>
        <p className="mt-0.5 text-[13.5px] leading-relaxed text-oasis-muted">{body}</p>
      </div>
    </div>
  );
}

function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-oasis-line">
      {items.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
          >
            <span className="text-[15px] font-semibold text-oasis-ink">{f.q}</span>
            <ChevronDown
              size={18}
              className={`flex-none text-oasis-muted transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-[14px] leading-relaxed text-oasis-muted">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
