import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgdark: "#0B050E",
        bgligth: "#ffff",
        negroNav: "#1e1e1e"
      },
    },
  },
  plugins: [],
};
export default config;
