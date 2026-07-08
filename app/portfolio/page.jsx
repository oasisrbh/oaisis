import PortfolioClient from "@/components/PortfolioClient";

export const metadata = {
  title: "Portfolio — Oasis",
  description: "Track your watchlist, Genesis pool status, and ownership on Oasis.",
};

export default function PortfolioPage() {
  return (
    <div className="pb-8">
      <PortfolioClient />
    </div>
  );
}
