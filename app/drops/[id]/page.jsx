import { notFound } from "next/navigation";
import AssetDetailClient from "@/components/AssetDetailClient";
import { assets, getAsset } from "@/lib/data";

export function generateStaticParams() {
  return assets.map((a) => ({ id: a.id }));
}

export function generateMetadata({ params }) {
  const asset = getAsset(params.id);
  if (!asset) return { title: "Pool not found — Oasis" };
  return {
    title: `${asset.name} — Oasis`,
    description: asset.description,
  };
}

export default function AssetPage({ params }) {
  const asset = getAsset(params.id);
  if (!asset) notFound();
  return (
    <div className="pb-8">
      <AssetDetailClient asset={asset} />
    </div>
  );
}
