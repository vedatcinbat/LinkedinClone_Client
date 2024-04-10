/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
      "light": {
        "light": "#EEE5E9",
        "dark": "#2e313c",
        "primary": "#5679e5",
        "secondary": "#D64933",
        "grayCustom": "#7C7C7C",
        "white": "#FFFFFF",
        "black": "#000000",
        "currentPage": "#b7e8fb",
      }
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
    extend: {
        backgroundImage: {
            'two-friend-talk': "url('/src/assets/images/twoFriendTalking.avif')",
        }
    },
  },
  plugins: [],
}

