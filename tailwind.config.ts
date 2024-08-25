import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#1d1d1f",
        secondary: "#6e6e73",
        error: "#de071c",
      },
      boxShadow: {
        "product-card": "2px 4px 12px #00000014",
        "product-card-hover": "rgba(0, 0, 0, 0.16) 2px 4px 16px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0,0,.5,1)",
      },
      scale: {
        101: "1.01",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],

} satisfies Config

export default config