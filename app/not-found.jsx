import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-oasis flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-aqua-600">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-oasis-ink">
        This pool drifted away
      </h1>
      <p className="mt-3 max-w-md text-sm text-oasis-muted">
        The page you're looking for doesn't exist. Head back to explore live pools.
      </p>
      <Link
        href="/drops"
        className="pill mt-7 gap-2 bg-oasis-ink px-5 py-3 text-sm text-white transition hover:bg-oasis-ink/90"
      >
        <ArrowLeft size={16} /> Back to drops
      </Link>
    </div>
  );
}
