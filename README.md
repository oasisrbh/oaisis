# Oasis

Premium fractional-ownership platform for real-world assets — luxury watches, rare
sneakers, and collectible RWAs pooled onchain. Built for **Robinhood Chain**.

> Frontend-only preview. Static mock data, mock wallet connect. Structured so real
> wallet + chain integration can drop in later.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS 3**
- **Framer Motion** — hero float, staggered cards, animated progress bars, tab transitions
- **lucide-react** — icon system

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Routes

| Route          | Page                                         |
| -------------- | -------------------------------------------- |
| `/`            | Landing — hero, latest drops, how it works   |
| `/drops`       | Explore — filters, sort, search, pool grid   |
| `/drops/[id]`  | Asset detail — pool panel, tabs, join flow   |
| `/portfolio`   | Dashboard — allocation, pools, activity      |
| `/about`       | About + Robinhood Chain sections             |

## Structure

```
app/                 Routes (App Router)
components/           UI — Header, Hero, AssetCard, WalletCard, DonutChart, …
lib/data.js          Mock assets, pools, portfolio + helpers
components/WalletProvider.jsx   Mock wallet context (replace connect() later)
```

## Wallet / chain integration

`components/WalletProvider.jsx` exposes `useWallet()` with
`{ connected, connecting, address, connect, disconnect }`. The mock `connect()`
simulates a handshake and persists to `localStorage`. Swap its body for a real
Robinhood Chain wallet flow — no UI changes required.

## Notes on copy

Deliberately avoids guaranteed-return language. Assets are marked as not-yet-custodied
placeholders. Risk disclosures appear on the detail page, footer, and about page.
