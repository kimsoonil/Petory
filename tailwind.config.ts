import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF9F43",
          dark: "#E5892A",
        },
        secondary: {
          DEFAULT: "#48C9B0",
          dark: "#3A9B87",
        },
      },
    },
  },
  plugins: [],
};

export default config;

