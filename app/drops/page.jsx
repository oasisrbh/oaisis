import ExploreClient from "@/components/ExploreClient";

export const metadata = {
  title: "Explore RWA Pools — Oasis",
  description:
    "Browse fractional pools for luxury watches, rare sneakers, and collectible RWAs on Robinhood Chain.",
};

export default function DropsPage() {
  return (
    <div className="pb-8">
      <ExploreClient />
    </div>
  );
}
