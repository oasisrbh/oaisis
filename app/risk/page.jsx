import { InfoPage, Section, List } from "@/components/InfoPage";
import { RISKS } from "@/lib/data";

export const metadata = {
  title: "Risk Disclosure — Oasis",
  description:
    "Fractional ownership of real-world assets involves risk. Read this before participating in an Oasis pool.",
};

export default function RiskPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Risk Disclosure"
      updated="July 8, 2026"
      intro="Fractional ownership of real-world assets involves risk. Please read this before joining a waitlist or participating in a pool."
    >
      <Section title="Key risks">
        <List items={RISKS} />
      </Section>

      <Section title="Asset value risk">
        <p>
          Collectible and luxury asset prices can move down as well as up.
          Historical demand, auction results, and collector interest do not
          predict future value. You may receive back less than you contributed.
        </p>
      </Section>

      <Section title="Liquidity & exit risk">
        <p>
          There may be no buyer when you wish to exit, and exit timing is not
          guaranteed. Selling a real-world asset can take time, and pool
          mechanisms are possibilities — not guaranteed outcomes.
        </p>
      </Section>

      <Section title="Custody & authentication risk">
        <p>
          Real-world assets carry storage, insurance, and authentication risk.
          Custody and authentication details must be verified before a pool
          settles, and are shown as placeholders until confirmed.
        </p>
      </Section>

      <Section title="No guarantees">
        <p>
          Oasis does not guarantee resale value, profit, exit timing, or any
          return. Nothing on Oasis is an offer, solicitation, or investment
          advice. Only participate with amounts you can afford to lose.
        </p>
      </Section>
    </InfoPage>
  );
}
