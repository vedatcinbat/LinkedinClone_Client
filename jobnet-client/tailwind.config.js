/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      "sans": ["Roboto", "sans-serif"],
      "serif": ["Roboto", "serif"],
      "mono": ["Roboto", "monospace"],
      "arial": ["Arial", "sans-serif"],
      "roboto": ["Roboto, sans-serif"],
      "myriad": ["Myriad Pro", "sans-serif"],
    },
    screens: {
      'smallPhone': '200px',
      'phone': '480px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    colors: {
      "mainBgColor": "#2a2a2a",
      "navbarBgColor": "#1a1a1a",
      "navbarTextColor": "#b2b1b1",
      "navbarHoverTextColor": "#f1f1f1",
      "currentPageTextColor": "#d5d4d4",
      "formBgColor": "#202020",
      "formTextColor": "#464646",
      "formBorderColor": "#4c4c4c",
      "formBtnColor": "#484848",
      "formBtnTextColor": "#b2b0b0",
      "formBtnHoverColor": "#686767",
      "formBtnHoverTextColor": "#d7d4d4",
      "alertSuccessBgColor": "#93fa83",
      "alertSuccessTextColor": "#1e1e1e",
      "alertErrorBgColor": "#fa8383",
      "alertErrorTextColor": "#f1f1f1",
    },
    fontSize: {
      "xs": ".75rem",
      "sm": ".875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}