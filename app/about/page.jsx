import Link from "next/link";
import { ChainSection, HowItWorks } from "@/components/SectionBits";
import { ArrowRight, ShieldCheck, Layers, Gem } from "lucide-react";

export const metadata = {
  title: "About — Oasis",
  description:
    "Oasis brings fractional ownership of real-world luxury assets onchain, built on Robinhood Chain.",
};

const PILLARS = [
  {
    icon: Gem,
    title: "Rare assets, simplified",
    body: "We curate collectible-grade watches, sneakers, and luxury goods with clear, honest pool terms.",
  },
  {
    icon: Layers,
    title: "Fractional by design",
    body: "Each asset is split into an onchain pool, so ownership starts from a low minimum entry.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & honest",
    body: "Clear funding, condition, and custody information — no guaranteed returns, no hype.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-8">
      <section className="container-oasis pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill gap-2 bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" /> About Oasis
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-oasis-ink sm:text-5xl">
            Own a slice of rare luxury.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-oasis-muted">
            Oasis is a platform for fractional ownership of real-world assets —
            luxury watches, rare sneakers, bags, and collectible RWAs pooled
            onchain and built on Robinhood Chain.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/drops"
              className="pill gap-2 bg-oasis-ink px-5 py-3 text-sm text-white shadow-soft transition hover:bg-oasis-ink/90"
            >
              Explore Drops <ArrowRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="pill border border-oasis-line bg-white px-5 py-3 text-sm font-semibold text-oasis-ink transition hover:bg-oasis-bg"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="card-hover rounded-3xl border border-oasis-line bg-white p-7 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-50 text-aqua-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-oasis-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-oasis-muted">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <HowItWorks />
      <ChainSection />

      <section className="container-oasis mt-24">
        <div className="rounded-4xl border border-oasis-line bg-white p-8 shadow-soft">
          <h2 className="text-xl font-bold text-oasis-ink">A note on risk</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-oasis-muted">
            Fractional ownership of real-world assets involves risk. Asset
            values may fluctuate and returns are not guaranteed. Oasis does not
            guarantee resale value, profit, or exit timing. Nothing on Oasis is
            an offer, solicitation, or investment advice — review final pool
            terms before participating.
          </p>
        </div>
      </section>
    </div>
  );
}
