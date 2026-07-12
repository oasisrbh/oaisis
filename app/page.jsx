import Hero from "@/components/Hero";
import LatestDrops from "@/components/LatestDrops";
import PresaleSection from "@/components/PresaleSection";
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
      <PresaleSection />
      <WhyCollectors />
      <HowItWorks />
      <Lifecycle />
      <ChainSection />
    </div>
  );
}
