import PortfolioClient from "@/components/PortfolioClient";

export const metadata = {
  title: "Portfolio — Oasis",
  description: "Track your funded pools, ownership, and exits on Oasis.",
};

export default function PortfolioPage() {
  return (
    <div className="pb-8">
      <PortfolioClient />
    </div>
  );
}
