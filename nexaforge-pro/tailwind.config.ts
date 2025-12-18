import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Inter", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "magic-grid":
          "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.35) 0, rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.18)",
        neon: "0 0 15px rgba(56, 189, 248, 0.45)",
      },
      animation: {
        "slow-spin": "slow-spin 12s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "slow-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 rgba(56, 189, 248, 0.25)",
          },
          "50%": {
            boxShadow: "0 0 45px rgba(56, 189, 248, 0.35)",
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
