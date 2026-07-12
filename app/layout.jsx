import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";
import { wagmiConfig } from "@/lib/wagmi";
import Web3Provider from "@/components/Web3Provider";
import PresaleAnnouncementBar from "@/components/PresaleAnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Oasis — Own rare assets fractionally",
  description:
    "Fractional pools for luxury watches, rare sneakers, and collectible RWAs. Built for onchain ownership on Robinhood Chain.",
};

export default async function RootLayout({ children }) {
  // Reading the wagmi cookie server-side lets the wallet's connected state
  // hydrate correctly on first paint instead of flashing "disconnected".
  const initialState = cookieToInitialState(wagmiConfig, headers().get("cookie"));

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Web3Provider initialState={initialState}>
          <PresaleAnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
