import Link from "next/link";
import RobinhoodChainBadge from "@/components/RobinhoodChainBadge";
import FooterPresaleAddress from "@/components/FooterPresaleAddress";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Drops", href: "/drops" },
      { label: "Pools", href: "/drops" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Robinhood Chain", href: "/robinhood-chain" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Risk", href: "/risk" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-oasis-line">
      {/* Top — cream */}
      <div className="bg-oasis-bg">
        <div className="container-oasis py-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
            <div>
              <span className="text-xl font-extrabold tracking-tight text-oasis-ink">Oasis</span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-oasis-muted">
                Rare assets. Clear pools. Onchain ownership. Fractional pools for
                watches, sneakers, bags, and collectible RWAs.
              </p>
              <RobinhoodChainBadge
                variant="lime"
                size="sm"
                label="Launching on Robinhood Chain"
                className="mt-5"
              />
              <FooterPresaleAddress className="mt-5" />
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-oasis-ink">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-oasis-muted transition-colors hover:text-oasis-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Risk box — light cream, black text */}
          <div className="mt-12 rounded-2xl border border-oasis-line bg-oasis-sand p-5">
            <p className="text-xs leading-relaxed text-oasis-ink/70">
              <span className="font-semibold text-oasis-ink">Risk disclaimer.</span>{" "}
              Fractional ownership of real-world assets involves risk. Asset
              values may fluctuate, liquidity and exit timing are not
              guaranteed, and Oasis does not guarantee resale value or profit.
              Review final pool terms before participating.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom — black band with lime accents + oversized wordmark */}
      <div className="relative overflow-hidden bg-oasis-ink text-white">
        <div className="container-oasis flex flex-col items-center justify-between gap-3 py-8 text-xs sm:flex-row">
          <p className="text-white/60">© {2026} Oasis. All rights reserved.</p>
          <div className="flex items-center gap-2.5">
            <RobinhoodChainBadge variant="dark" size="sm" showText={false} />
            <p className="font-semibold text-aqua-400">
              Built for onchain ownership on Robinhood Chain
            </p>
          </div>
        </div>
        {/* oversized faint wordmark — premium brand-ending moment */}
        <div className="pointer-events-none select-none">
          <div className="container-oasis">
            <span className="-mb-[0.12em] block text-[20vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.05]">
              oasis
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
