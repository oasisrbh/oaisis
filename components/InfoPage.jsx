import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Shared shell for the informational / legal / docs pages.
// Server component — no client interactivity needed.
export function InfoPage({ eyebrow, title, intro, updated, children }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-6 pt-10 sm:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-oasis-muted transition hover:text-oasis-ink"
      >
        <ArrowLeft size={16} /> Back to Oasis
      </Link>

      <div className="mt-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-balance text-[34px] leading-[1.05] h-display sm:text-[44px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-[17px] leading-relaxed text-oasis-muted">{intro}</p>
        )}
        {updated && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-oasis-line bg-white px-3 py-1.5 text-xs font-medium text-oasis-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" /> Last updated {updated}
          </span>
        )}
      </div>

      <div className="mt-12 space-y-10">{children}</div>

      <div className="mt-16 rounded-2xl border border-oasis-line bg-oasis-sand p-5">
        <p className="text-xs leading-relaxed text-oasis-muted">
          <span className="font-semibold text-oasis-ink">Note.</span> This page
          is provided for general information only and is not legal, financial,
          tax, or investment advice.
        </p>
      </div>
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <section>
      {title && <h2 className="text-xl font-bold text-oasis-ink">{title}</h2>}
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-oasis-muted">
        {children}
      </div>
    </section>
  );
}

// Simple bulleted list for use inside a Section.
export function List({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-aqua-400" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
