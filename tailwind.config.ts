import type { Config } from "tailwindcss";

/**
 * Stoq design system.
 *
 * Graphite ink, one electric azure signal, and a lime reading light for the
 * numbers that matter. The glass surfaces follow the same system as Pharmiq;
 * the palette and the Space Grotesk / Inter pairing are Stoq's own.
 */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04060c",
          900: "#060911",
          850: "#080d18",
          800: "#0b1220",
          750: "#0e1728",
          700: "#121d31",
          600: "#1a2740",
        },
        azure: {
          200: "#d6e3ff",
          300: "#b3caff",
          400: "#8aabff",
          500: "#5b8cff",
          600: "#3b6df0",
          700: "#2b52c4",
        },
        lime: {
          200: "#eefbc0",
          300: "#e2f99a",
          400: "#d3f36b",
          500: "#bce743",
          600: "#9ac92a",
        },
        bone: "#e9eefb",
        fog: {
          DEFAULT: "#93a0b8",
          dim: "#6f7d97",
          faint: "#4d5a72",
        },
        amber: {
          DEFAULT: "#f7b955",
          soft: "#ffd79a",
        },
        rose: {
          DEFAULT: "#fb7185",
          soft: "#fecdd3",
        },
        violet: "#a78bfa",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glass: "0 24px 60px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",
        azure: "0 18px 50px -18px rgba(91,140,255,0.4)",
        panel: "0 40px 120px -40px rgba(0,0,0,0.95)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(40px,-70px,0) scale(1.07)" },
          "66%": { transform: "translate3d(-40px,40px,0) scale(0.95)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
        "marquee-reverse": "marqueeReverse 52s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
