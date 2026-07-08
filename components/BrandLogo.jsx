import Image from "next/image";

// Reusable Oasis brand logo.
// Assets are clean transparent PNGs extracted from the master lockup:
//   /brand/oasis-icon.png     — orbital ring mark (447x472)
//   /brand/oasis-wordmark.png — "OASIS" wordmark, dark (513x93)
//
// variant: "full" (icon + wordmark) | "icon" (mark only)
// theme:   "light" (dark wordmark on cream/white) | "dark" (wordmark inverted to cream on black)
// size:    "sm" | "md" | "lg"
const ICON_RATIO = 447 / 472; // w / h
const WORD_RATIO = 513 / 93;

const SIZES = {
  sm: { icon: 22, word: 13, gap: "gap-1.5" },
  md: { icon: 28, word: 17, gap: "gap-2" },
  lg: { icon: 40, word: 25, gap: "gap-2.5" },
};

export default function BrandLogo({
  variant = "full",
  theme = "light",
  size = "md",
  priority = false,
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;
  const iconH = s.icon;
  const iconW = Math.round(iconH * ICON_RATIO);
  const wordH = s.word;
  const wordW = Math.round(wordH * WORD_RATIO);
  const isFull = variant === "full";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src="/brand/oasis-icon.png"
        alt={isFull ? "" : "Oasis icon"}
        aria-hidden={isFull ? true : undefined}
        width={iconW}
        height={iconH}
        priority={priority}
        style={{ height: iconH, width: iconW }}
        className="select-none"
      />
      {isFull && (
        <Image
          src="/brand/oasis-wordmark.png"
          alt="Oasis"
          width={wordW}
          height={wordH}
          priority={priority}
          style={{ height: wordH, width: wordW }}
          className={`select-none ${theme === "dark" ? "invert" : ""}`}
        />
      )}
    </span>
  );
}
