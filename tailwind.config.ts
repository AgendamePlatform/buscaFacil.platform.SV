import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgdark: "#2e2d2d",
        bgligth: "#ffff",
        bgDarkOscuro: "#1e1f22",
        bgprimaryLigth: "#fbfeff",
        border: "#e3f5f5",
        azulito: "#1a0f3a",
        celeste: "#aad3df",
        negroNav: "#1e1e1e",
      },
    },
  },
  plugins: [],
};
export default config;
