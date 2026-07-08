// ---------------------------------------------------------------------------
// Oasis — static mock data
// Structured so wallet + Robinhood Chain integration can replace these later.
// Every asset carries the full RWA record: pool economics, thesis, docs, custody.
// ---------------------------------------------------------------------------

export const CHAIN = "Robinhood Chain";

// Genesis launch: 2.5 weeks (17 days 12 hours) from build/runtime.
// Baked once at module load; the countdown ticks toward this fixed timestamp.
export const GENESIS_LAUNCH_DATE = new Date(
  Date.now() + 17.5 * 24 * 60 * 60 * 1000
).toISOString();

// Category tabs used across explore + home
export const CATEGORIES = [
  "Popular",
  "Watches",
  "Sneakers",
  "Bags",
  "Collectibles",
  "Ending Soon",
];

// Status vocabulary (RWA-native):
// "Live" | "Opening Soon" | "Fully Allocated" | "Closed"

const rawAssets = [
  {
    id: "rolex-daytona-panda",
    image: "/assets/rolex-daytona-panda.jpg",
    featuredGenesis: true,
    launchDate: GENESIS_LAUNCH_DATE,
    name: "Rolex Daytona Panda",
    brand: "Rolex",
    category: "Watches",
    assetType: "Wristwatch",
    icon: "watch",
    description:
      "Ref. 116500LN with the coveted white 'Panda' dial — sustained collector demand and multi-year retail waitlists.",
    poolSize: 68000,
    fundedAmount: 56440,
    status: "Launching Soon",
    chain: CHAIN,
    minEntry: 100,
    ownershipAvailable: 17,
    targetClose: "~12 days",
    condition: "Unworn, full set",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Strong collector interest",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "The steel Daytona is one of the most requested references in the secondary market, with multi-year waitlists at retail.",
      scarcity:
        "Retail supply is tightly controlled; clean full-set examples rarely trade openly.",
      secondaryMarket:
        "Consistent secondary-market premiums and strong auction results since the 2016 ceramic-bezel release.",
      condition: "Unworn — box, papers, and tags present.",
    },
  },
  {
    id: "patek-nautilus-5711",
    image: "/assets/patek-nautilus-5711.jpg",
    featuredGenesis: true,
    isLocked: true,
    name: "Patek Philippe Nautilus 5711",
    brand: "Patek Philippe",
    category: "Watches",
    assetType: "Wristwatch",
    icon: "watch",
    description:
      "Discontinued 5711/1A with the blue dial — a modern grail and one of the most sought-after references in watchmaking.",
    poolSize: 145000,
    fundedAmount: 92800,
    status: "Live",
    chain: CHAIN,
    minEntry: 250,
    ownershipAvailable: 36,
    targetClose: "~21 days",
    condition: "Excellent, complete set",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "High historical demand",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "Persistent global demand keeps the blue-dial 5711 near the top of most serious collectors' lists.",
      scarcity:
        "Production of the steel 5711 ended in 2021, permanently tightening supply.",
      secondaryMarket:
        "The reference frequently sets records at major auction houses.",
      condition: "Excellent — light wear, complete set with documentation.",
    },
  },
  {
    id: "ap-royal-oak-jumbo",
    image: "/assets/ap-royal-oak-jumbo.jpg",
    name: "Audemars Piguet Royal Oak Jumbo",
    brand: "Audemars Piguet",
    category: "Watches",
    assetType: "Wristwatch",
    icon: "watch",
    description:
      "The 'Jumbo' Extra-Thin 15202 — the purest expression of Gérald Genta's 1972 design icon.",
    poolSize: 98000,
    fundedAmount: 41160,
    status: "Live",
    chain: CHAIN,
    minEntry: 150,
    ownershipAvailable: 58,
    targetClose: "~18 days",
    condition: "Very good, serviced",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Icon status",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "A design landmark and cornerstone of any serious watch collection.",
      scarcity:
        "The discontinued 15202 'Jumbo' is increasingly hard to source in good condition.",
      secondaryMarket:
        "Blue 'Petite Tapisserie' dial variants remain especially desirable.",
      condition: "Very good — recently serviced, complete set.",
    },
  },
  {
    id: "jordan-1-dior",
    image: "/assets/jordan-1-dior.jpg",
    featuredGenesis: true,
    isLocked: true,
    name: "Air Jordan 1 High Dior",
    brand: "Nike x Dior",
    category: "Sneakers",
    assetType: "Sneaker",
    icon: "sneaker",
    description:
      "The Air Dior collaboration — 8,500 pairs worldwide. Wolf grey with oblique detailing and a deadstock finish.",
    poolSize: 24000,
    fundedAmount: 21120,
    status: "Live",
    chain: CHAIN,
    minEntry: 50,
    ownershipAvailable: 12,
    targetClose: "~5 days",
    condition: "Deadstock, unworn",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Capped supply, high demand",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "One of the most hyped sneaker collaborations ever, released by lottery only.",
      scarcity:
        "Just 8,500 pairs were produced worldwide across all sizes.",
      secondaryMarket:
        "Resale multiples remain well above retail across sizes.",
      condition: "Deadstock — unworn with original packaging.",
    },
  },
  {
    id: "af1-tiffany",
    image: "/assets/af1-tiffany.jpg",
    name: "Nike Air Force 1 x Tiffany & Co.",
    brand: "Nike x Tiffany",
    category: "Sneakers",
    assetType: "Sneaker",
    icon: "sneaker",
    description:
      "'1837' Air Force 1 Low in black suede with a robin's-egg accent — the deluxe boxed-set variant.",
    poolSize: 16000,
    fundedAmount: 4800,
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 50,
    ownershipAvailable: 70,
    targetClose: "Opens in ~3 days",
    condition: "Deadstock, boxed set",
    authenticationStatus: "In review",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Buzz-driven demand",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "A polarizing but highly collectible release, especially the deluxe boxed set.",
      scarcity:
        "Boxed sets with the accent hardware are far scarcer than the standard pair.",
      secondaryMarket:
        "Boxed sets trade at a meaningful premium to the standard pair.",
      condition: "Deadstock — full boxed set.",
    },
  },
  {
    id: "hermes-birkin-25",
    image: "/assets/hermes-birkin-25.jpg",
    featuredGenesis: true,
    isLocked: true,
    name: "Hermès Birkin 25",
    brand: "Hermès",
    category: "Bags",
    assetType: "Handbag",
    icon: "bag",
    description:
      "Birkin 25 in Togo leather with palladium hardware — among the most liquid handbags in the resale market.",
    poolSize: 42000,
    fundedAmount: 42000,
    status: "Fully Allocated",
    chain: CHAIN,
    minEntry: 100,
    ownershipAvailable: 0,
    targetClose: "Closed",
    condition: "Pristine, full set",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Historically resilient category",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "Birkins show resilient long-term demand and are among the most recognizable luxury assets.",
      scarcity:
        "Access is tightly controlled at retail; smaller sizes are especially hard to source.",
      secondaryMarket:
        "25cm sizes and neutral colorways are among the most liquid in the category.",
      condition: "Pristine — store fresh with full set.",
    },
  },
  {
    id: "supreme-box-logo",
    image: "/assets/supreme-box-logo.jpg",
    name: "Supreme Box Logo Hoodie",
    brand: "Supreme",
    category: "Collectibles",
    assetType: "Apparel",
    icon: "shirt",
    description:
      "A grail-tier box logo hoodie in deadstock condition — a cornerstone of streetwear archives.",
    poolSize: 9000,
    fundedAmount: 6390,
    status: "Live",
    chain: CHAIN,
    minEntry: 25,
    ownershipAvailable: 29,
    targetClose: "~9 days",
    condition: "Deadstock, tagged",
    authenticationStatus: "Authenticated",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Archive-grade demand",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "Early box logo hoodies are the blue chips of streetwear collecting.",
      scarcity:
        "Deadstock examples in sought-after colorways rarely surface.",
      secondaryMarket:
        "Sought-after colorways remain highly liquid on the secondary market.",
      condition: "Deadstock — unworn with tags.",
    },
  },
  {
    id: "louis-vuitton-trunk",
    image: "/assets/louis-vuitton-trunk.jpg",
    name: "Louis Vuitton Malle Courrier Trunk",
    brand: "Louis Vuitton",
    category: "Collectibles",
    assetType: "Heritage object",
    icon: "trunk",
    description:
      "A restored vintage monogram courier trunk — heritage craftsmanship with documented provenance.",
    poolSize: 55000,
    fundedAmount: 13750,
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 150,
    ownershipAvailable: 75,
    targetClose: "Opens in ~6 days",
    condition: "Restored, sound",
    authenticationStatus: "In review",
    custodyStatus: "Placeholder — pending verification",
    estimatedInterest: "Provenance-driven",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
    thesis: {
      collectorDemand:
        "Antique LV trunks combine functional heritage with decorative value and provenance.",
      scarcity:
        "Well-preserved courier trunks are scarce and collected globally.",
      secondaryMarket:
        "Documented, restored examples command a premium among heritage collectors.",
      condition: "Professionally restored, structurally sound.",
    },
  },
];

// Standard document set attached to every pool. Statuses are honest:
// authentication tracks the asset's real status; the rest are placeholders.
function documentsFor(a) {
  return [
    {
      name: "Authentication report",
      hint: "Independent specialist review",
      status: a.authenticationStatus === "Authenticated" ? "Available" : "In review",
    },
    { name: "Condition report", hint: "Grading & photos", status: "Available" },
    { name: "Purchase invoice", hint: "Acquisition record", status: "Locked" },
    { name: "Custody record", hint: "Storage & insurance", status: "Placeholder" },
  ];
}

// Enrich each asset with derived fields consumed by the UI.
export const assets = rawAssets.map((a) => ({
  ...a,
  fundedPercentage: Math.round((a.fundedAmount / a.poolSize) * 100),
  remainingAllocation: Math.max(0, a.poolSize - a.fundedAmount),
  documents: documentsFor(a),
}));

// The curated Genesis drops shown on the homepage: 1 live + 3 locked.
// Order follows the source array: Rolex (live), Patek, Jordan, Birkin (locked).
// All other assets remain in `assets` for the Explore page / future use.
export const genesisDrops = assets.filter((a) => a.featuredGenesis);

// Shared, honest risk statements (used on detail + legal surfaces).
export const RISKS = [
  "Asset values can move down. Past demand does not predict future value.",
  "Liquidity is not guaranteed — there may be no buyer when you wish to exit.",
  "Exit timing is not guaranteed and may take longer than expected.",
  "Custody and authentication details must be verified before a pool settles.",
  "This is an early product preview using placeholder data — not investment advice.",
];

// Potential exit mechanisms (possibilities, not promises).
export const EXIT_PATHS = [
  {
    icon: "store",
    title: "Marketplace resale",
    body: "The asset is listed and sold; proceeds are distributed pro-rata to the pool.",
  },
  {
    icon: "handshake",
    title: "Buyout proposal",
    body: "A buyer offers to acquire the full asset; holders vote to accept or decline.",
  },
  {
    icon: "tag",
    title: "Direct asset sale",
    body: "A private sale is arranged and settled, closing the pool.",
  },
  {
    icon: "repeat",
    title: "Secondary pool transfer",
    body: "Ownership positions move to another holder, subject to available liquidity.",
  },
];

// Featured items for the hero carousel
export const featured = [
  {
    id: "rolex-daytona-panda",
    image: "/assets/rolex-daytona-panda.jpg",
    tag: "Rolex Daytona Panda",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
  },
  {
    id: "patek-nautilus-5711",
    image: "/assets/patek-nautilus-5711.jpg",
    tag: "Patek Philippe Nautilus",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
  },
  {
    id: "jordan-1-dior",
    image: "/assets/jordan-1-dior.jpg",
    tag: "Air Jordan 1 Dior",
    gradient: "from-[#f1f0e8] via-[#eeede4] to-[#e9e8dd]",
    accent: "#c8ff00",
  },
];

// Pre-launch activity for Genesis pools (no funding before launch)
export const launchActivity = [
  { wallet: "0x8f…2a11", action: "Joined waitlist", amount: "—", ownership: "—", time: "4m ago" },
  { wallet: "0x1c…9b04", action: "Registered interest", amount: "—", ownership: "—", time: "22m ago" },
  { wallet: "0xa7…f3d9", action: "Added to watchlist", amount: "—", ownership: "—", time: "1h ago" },
  { wallet: "0x5e…77c2", action: "Viewed pool", amount: "—", ownership: "—", time: "2h ago" },
  { wallet: "0x9d…04ab", action: "Joined waitlist", amount: "—", ownership: "—", time: "5h ago" },
  { wallet: "0x2b…c810", action: "Registered interest", amount: "—", ownership: "—", time: "8h ago" },
];

// Mock pool activity (per-pool tables reuse this)
export const activity = [
  { wallet: "0x8f…2a11", action: "Joined pool", amount: "$500", ownership: "0.74%", time: "2m ago" },
  { wallet: "0x1c…9b04", action: "Joined pool", amount: "$1,200", ownership: "1.76%", time: "18m ago" },
  { wallet: "0xa7…f3d9", action: "Joined pool", amount: "$250", ownership: "0.37%", time: "1h ago" },
  { wallet: "0x5e…77c2", action: "Added to watchlist", amount: "—", ownership: "—", time: "3h ago" },
  { wallet: "0x9d…04ab", action: "Joined pool", amount: "$3,000", ownership: "4.41%", time: "5h ago" },
  { wallet: "0x2b…c810", action: "Joined pool", amount: "$800", ownership: "1.18%", time: "9h ago" },
];

// Asset lifecycle stages (product flow, not a guarantee)
export const LIFECYCLE = [
  { key: "sourced", label: "Sourced", body: "A rare asset is identified and acquired." },
  { key: "verified", label: "Verified", body: "Authentication and condition are reviewed." },
  { key: "pooled", label: "Pooled", body: "The asset is structured into an onchain pool." },
  { key: "funded", label: "Funded", body: "Members contribute until the pool closes." },
  { key: "stored", label: "Stored", body: "The asset is held with a designated custodian." },
  { key: "exit", label: "Exit / resale", body: "A resale or buyout distributes proceeds." },
];

// ---------------------------------------------------------------------------
// Mock portfolio (logged-in state)
// ---------------------------------------------------------------------------
// Launch-safe portfolio. Oasis has not launched yet — no holdings, value,
// active positions, or completed pools. Watchlist + genesis status derive from
// `genesisDrops`; only wallet + pre-launch activity live here.
export const portfolio = {
  wallet: "0x7A2f…9E4c",
  recentActivity: [
    { action: "Wallet connected", time: "Just now" },
    { action: "Viewed Genesis pools", time: "2m ago" },
    { action: "Added Rolex Daytona Panda to watchlist", time: "5m ago" },
  ],
};

// Helpers ------------------------------------------------------------------
export function fundedPercentage(a) {
  if (!a.poolSize) return 0;
  return Math.round((a.fundedAmount / a.poolSize) * 100);
}

export function getAsset(id) {
  return assets.find((a) => a.id === id);
}

export function formatUsd(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n.toLocaleString()}`;
}

// Aggregate stats for the explore header
export const STATS = {
  poolCount: assets.length,
  totalPoolValue: assets.reduce((s, a) => s + a.poolSize, 0),
  categoryCount: new Set(assets.map((a) => a.category)).size,
  chain: CHAIN,
};
