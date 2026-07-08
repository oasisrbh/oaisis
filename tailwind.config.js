/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Oasis base (Robinhood-inspired: cream / black) ----
        oasis: {
          bg: "#F7F6EF", // warm off-white page background
          card: "#FFFFFF",
          ink: "#050505", // near-black foreground
          muted: "#6E7068", // muted text
          line: "#DDDDD2", // borders
          sand: "#EEEDE4", // light cream
          cream: "#EEEDE4",
          dark: "#050505", // deep black
          darkcard: "#101010", // soft black
          charcoal: "#171717",
        },
        // ---- Primary accent: neon lime (kept under the `aqua` name so
        //      existing accent classes across the app render as lime) ----
        aqua: {
          50: "#f7ffe0",
          100: "#ecffb0",
          200: "#ddff7a",
          300: "#cfff3d",
          400: "#c8ff00", // primary neon lime
          500: "#b2e600",
          600: "#5f7d00", // dark olive-lime — readable as text/icon on light
          700: "#4d6410",
          800: "#2E3A16", // muted olive
          900: "#1C250C", // dark moss
        },
        lime: {
          DEFAULT: "#c8ff00",
          bright: "#c8ff00",
          soft: "#ddff7a",
          deep: "#b2e600",
          olive: "#2E3A16",
          moss: "#1C250C",
        },
        // ---- Dark surfaces (kept under the `navy` name so existing
        //      from-navy-* gradients render as charcoal/black) ----
        navy: {
          700: "#171717", // charcoal
          800: "#101010", // soft black
          900: "#050505", // deep black
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Fraunces",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(14, 21, 38, 0.10)",
        card: "0 16px 44px -20px rgba(14, 21, 38, 0.14)",
        lift: "0 30px 70px -28px rgba(5, 5, 5, 0.30)",
        // lime glow for hover / dark card edges
        glow: "0 0 0 1px rgba(200, 255, 0, 0.5), 0 18px 50px -18px rgba(200, 255, 0, 0.45)",
        glowdark: "0 0 0 1px rgba(200, 255, 0, 0.28), 0 24px 60px -24px rgba(200, 255, 0, 0.25)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(10px,-8px) scale(1.05)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
