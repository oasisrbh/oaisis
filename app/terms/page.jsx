import { InfoPage, Section, List } from "@/components/InfoPage";

export const metadata = {
  title: "Terms of Service — Oasis",
  description: "The terms that govern your use of the Oasis platform.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="July 8, 2026"
      intro="These terms govern your use of the Oasis website and platform. By using Oasis, you agree to them."
    >
      <Section title="1. The Oasis platform">
        <p>
          Oasis provides access to RWA pool information, wallet features,
          waitlist flows, and participation interfaces. Features, assets,
          pools, and timelines shown may change or be removed at any time
          without notice.
        </p>
      </Section>

      <Section title="2. Not investment advice">
        <p>
          Nothing on Oasis is an offer, solicitation, or recommendation to buy,
          sell, or hold any asset, and nothing here is financial, legal, tax, or
          investment advice. You are solely responsible for your own decisions.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p>
          You must be legally able to enter into these terms in your jurisdiction.
          Access may be restricted where use of the platform would be unlawful.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <List
          items={[
            "Do not use Oasis for unlawful, fraudulent, or abusive purposes.",
            "Do not attempt to disrupt, reverse engineer, or gain unauthorized access to the service.",
            "Do not misrepresent your identity or your relationship with Oasis.",
          ]}
        />
      </Section>

      <Section title="5. Risk">
        <p>
          Fractional ownership of real-world assets involves risk. Asset values
          may fall, liquidity is not guaranteed, and exit timing is not
          guaranteed. See the{" "}
          <a href="/risk" className="font-semibold text-oasis-ink underline decoration-aqua-400 underline-offset-2">
            Risk Disclosure
          </a>
          .
        </p>
      </Section>

      <Section title="6. No warranties & liability">
        <p>
          The Oasis platform is provided "as is" without warranties of any kind.
          To the fullest extent permitted by law, Oasis is not liable for any
          losses arising from your use of the platform.
        </p>
      </Section>

      <Section title="7. Changes">
        <p>
          We may update these terms as the platform evolves. Continued use after
          an update means you accept the revised terms.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about these terms can be sent to hello@oasis.example.</p>
      </Section>
    </InfoPage>
  );
}
