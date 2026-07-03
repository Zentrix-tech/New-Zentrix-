import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand
        violet: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },
        cyan: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        // Dark surfaces
        bg: {
          primary: "#050508",
          secondary: "#0A0A0F",
          surface: "#0D0D18",
          "surface-2": "#12121E",
          "surface-3": "#181826",
        },
        // Text
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#475569",
          disabled: "#334155",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.12)",
          violet: "rgba(124, 58, 237, 0.3)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 6vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "clamp(80px, 10vw, 140px)",
        container: "clamp(24px, 4vw, 80px)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "60px",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #06B6D4 100%)",
        "gradient-violet": "linear-gradient(135deg, #7C3AED, #A855F7)",
        "gradient-cyan": "linear-gradient(135deg, #06B6D4, #22D3EE)",
        "gradient-dark": "linear-gradient(135deg, #0D0D18 0%, #050508 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-violet": "radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "glow-violet": "0 0 60px rgba(124, 58, 237, 0.3)",
        "glow-cyan": "0 0 60px rgba(6, 182, 212, 0.25)",
        "glow-pink": "0 0 60px rgba(236, 72, 153, 0.2)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "elevated": "0 20px 60px rgba(0, 0, 0, 0.6)",
        "inner-glow": "inset 0 0 30px rgba(124, 58, 237, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-glow-cyan": "pulse-glow-cyan 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "morph": "morph 10s ease-in-out infinite",
        "twinkle": "star-twinkle 3s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(6px) rotate(-1deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(10px) rotate(-1deg)" },
          "66%": { transform: "translateY(-8px) rotate(1deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 60px rgba(124, 58, 237, 0.8)" },
        },
        "pulse-glow-cyan": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 60px rgba(6, 182, 212, 0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 40% 70% 40%" },
          "75%": { borderRadius: "60% 40% 60% 30% / 70% 30% 50% 60%" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "reveal-up": {
          from: { clipPath: "inset(100% 0 0 0)", transform: "translateY(20px)" },
          to: { clipPath: "inset(0% 0 0 0)", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
