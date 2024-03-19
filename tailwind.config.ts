import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      backgroundColor: {
        darkBlue: "#161250",
        hoverColor:"#191280",
        violet: "#9D9DBC"
      },
      borderWidth: {
        1:"1px"
      },
    },
  },
  plugins: [],
};
export default config;
