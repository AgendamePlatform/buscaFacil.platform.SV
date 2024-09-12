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
        bgdark: "#1e1f22",
        bgligth: "#ffff",
        bgDarkOscuro: "#1e1f22",
        azulito: "#3d87f4",
        negroNav: "#1e1e1e",
        inputClaro: "#f3f0ff",
        inputOscuro: "#404040",
      },
    },
  },
  plugins: [],
};
export default config;
