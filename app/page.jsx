import Hero from "@/components/Hero";
import LatestDrops from "@/components/LatestDrops";
import {
  WhyCollectors,
  HowItWorks,
  Lifecycle,
  ChainSection,
} from "@/components/SectionBits";

export default function HomePage() {
  return (
    <div className="pb-10">
      <Hero />
      <LatestDrops />
      <WhyCollectors />
      <HowItWorks />
      <Lifecycle />
      <ChainSection />
    </div>
  );
}
