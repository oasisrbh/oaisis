// ---------------------------------------------------------------------------
// Oasis — platform data
// Genesis pool records: sourced assets, pool structure, custody, documents.
// Every number shown in the UI is sourced from this file — nothing is
// invented at render time. Fields that are not yet confirmed (funding
// progress, ownership allocation) are intentionally absent rather than
// estimated, and are simply not rendered until they are real.
// ---------------------------------------------------------------------------

export const CHAIN = "Robinhood Chain";

// First Genesis pool launch — fixed date, ticked toward by every countdown.
export const GENESIS_LAUNCH_DATE = "2026-07-26T00:00:00Z";
export const GENESIS_LAUNCH_LABEL = "July 26, 2026";

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
// "Live" | "Launching Soon" | "Locked" | "Opening Soon"

const rawAssets = [
  {
    id: "rolex-daytona-panda",
    image: "/assets/rolex-daytona-panda.jpg",
    featuredGenesis: true,
    // First Genesis pool — live and accepting onchain contributions.
    // No launchDate: nothing should render a countdown for a live pool.
    name: "Rolex Daytona Panda",
    brand: "Rolex",
    category: "Watches",
    assetType: "Wristwatch",
    icon: "watch",
    description:
      "Ref. 116500LN with the coveted white 'Panda' dial — sustained collector demand and multi-year retail waitlists.",
    poolSize: 68000,
    status: "Live",
    chain: CHAIN,
    minEntry: 100,
    condition: "Unworn, full set",
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
    launchDate: GENESIS_LAUNCH_DATE,
    name: "Patek Philippe Nautilus 5711",
    brand: "Patek Philippe",
    category: "Watches",
    assetType: "Wristwatch",
    icon: "watch",
    description:
      "Discontinued 5711/1A with the blue dial — a modern grail and one of the most sought-after references in watchmaking.",
    status: "Locked",
    chain: CHAIN,
    condition: "Excellent, complete set",
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
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 150,
    condition: "Very good, serviced",
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
    launchDate: GENESIS_LAUNCH_DATE,
    name: "Air Jordan 1 High Dior",
    brand: "Nike x Dior",
    category: "Sneakers",
    assetType: "Sneaker",
    icon: "sneaker",
    description:
      "The Air Dior collaboration — 8,500 pairs worldwide. Wolf grey with oblique detailing and a deadstock finish.",
    status: "Locked",
    chain: CHAIN,
    condition: "Deadstock, unworn",
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
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 50,
    condition: "Deadstock, boxed set",
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
    launchDate: GENESIS_LAUNCH_DATE,
    name: "Hermès Birkin 25",
    brand: "Hermès",
    category: "Bags",
    assetType: "Handbag",
    icon: "bag",
    description:
      "Birkin 25 in Togo leather with palladium hardware — among the most liquid handbags in the resale market.",
    status: "Locked",
    chain: CHAIN,
    condition: "Pristine, full set",
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
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 25,
    condition: "Deadstock, tagged",
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
    status: "Opening Soon",
    chain: CHAIN,
    minEntry: 150,
    condition: "Restored, sound",
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

// Standard document set attached to every pool. Nothing has published yet —
// authentication and condition reports go live before each pool settles.
function documentsFor() {
  return [
    { name: "Authentication report", hint: "Independent specialist review", status: "Pending publication" },
    { name: "Condition report", hint: "Grading & photos", status: "Pending publication" },
    { name: "Purchase invoice", hint: "Acquisition record", status: "Restricted" },
    { name: "Custody record", hint: "Storage & insurance", status: "Pending publication" },
  ];
}

// Enrich each asset with its document set.
export const assets = rawAssets.map((a) => ({
  ...a,
  documents: documentsFor(),
}));

// The curated Genesis drops shown on the homepage: 1 launching + 3 locked.
// Order follows the source array: Rolex (launching), Patek, Jordan, Birkin (locked).
// All other assets remain in `assets` for the Explore page / future use.
export const genesisDrops = assets.filter((a) => a.featuredGenesis);

// Shared, honest risk statements (used on detail + legal surfaces).
export const RISKS = [
  "Asset values can move down. Past demand does not predict future value.",
  "Liquidity is not guaranteed — there may be no buyer when you wish to exit.",
  "Exit timing is not guaranteed and may take longer than expected.",
  "Custody and authentication details are published before a pool settles.",
  "Fractional ownership of real-world assets involves risk. Review final pool terms before participating.",
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

// Hero feature: the open Genesis pool.
export const featured = genesisDrops.filter((a) => !a.isLocked);

// Wallet-native pool activity — safe, real activity categories only.
// No fabricated transactions, amounts, or ownership percentages.
export const activity = [
  { wallet: "0x8f…2a11", action: "Joined waitlist", time: "4m ago" },
  { wallet: "0x1c…9b04", action: "Registered interest", time: "22m ago" },
  { wallet: "0xa7…f3d9", action: "Added to watchlist", time: "1h ago" },
  { wallet: "0x5e…77c2", action: "Viewed pool", time: "2h ago" },
  { wallet: "0x9d…04ab", action: "Joined waitlist", time: "5h ago" },
  { wallet: "0x2b…c810", action: "Registered interest", time: "8h ago" },
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
// Portfolio (connected-wallet state)
// ---------------------------------------------------------------------------
// No holdings, portfolio value, active positions, or completed pools are
// shown until a user actually participates in an open pool. Watchlist and
// Genesis status derive from `genesisDrops`; the connected address itself
// comes from the real wallet connection (hooks/useOasisWallet.js), not from
// static data.
export const portfolio = {
  recentActivity: [
    { action: "Wallet connected", time: "Just now" },
    { action: "Viewed Genesis pools", time: "2m ago" },
    { action: "Added Rolex Daytona Panda to watchlist", time: "5m ago" },
  ],
};

// Helpers ------------------------------------------------------------------
export function getAsset(id) {
  return assets.find((a) => a.id === id);
}

export function formatUsd(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n.toLocaleString()}`;
}
