import { InfoPage, Section, List } from "@/components/InfoPage";

export const metadata = {
  title: "Privacy Policy — Oasis",
  description: "How Oasis handles information in this product preview.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 8, 2026"
      intro="This placeholder policy explains how Oasis handles information during the product preview. We aim to collect as little as possible."
    >
      <Section title="Information we collect">
        <List
          items={[
            "Wallet address — a public identifier if you connect a wallet.",
            "Basic usage data — pages viewed and interactions, to improve the preview.",
            "Anything you voluntarily provide, such as a waitlist email.",
          ]}
        />
      </Section>

      <Section title="Wallet data">
        <p>
          A connected wallet address is public information. In this preview,
          wallet connection is simulated and no private keys are ever requested,
          stored, or transmitted.
        </p>
      </Section>

      <Section title="How we use information">
        <p>
          We use information to operate and improve the preview, communicate about
          the Genesis launch, and keep the product secure. We do not sell your
          personal information.
        </p>
      </Section>

      <Section title="Cookies & analytics">
        <p>
          Oasis may use minimal local storage and privacy-conscious analytics to
          understand how the preview is used. You can clear local storage in your
          browser at any time.
        </p>
      </Section>

      <Section title="Sharing">
        <p>
          We may share limited data with service providers that help us run the
          preview, or where required by law. We do not sell personal data to third
          parties.
        </p>
      </Section>

      <Section title="Your choices">
        <p>
          You can disconnect your wallet, clear stored data, or request removal of
          any information you provided by contacting us.
        </p>
      </Section>

      <Section title="Contact">
        <p>Privacy questions can be sent to privacy@oasis.example.</p>
      </Section>
    </InfoPage>
  );
}
