import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "dialog-in": "dialog-in 0.25s ease-out",
        "dialog-out": "dialog-out 0.2s ease-in forwards",
        "dialog-overlay-in": "dialog-overlay-in 0.25s ease-out",
        "dialog-overlay-out": "dialog-overlay-out 0.2s ease-in forwards",
      },
      keyframes: {
        "dialog-in": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, calc(-50% - 10px)) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        "dialog-out": {
          "0%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, calc(-50% - 10px)) scale(0.96)",
          },
        },
        "dialog-overlay-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "dialog-overlay-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
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
    },
  },
}
