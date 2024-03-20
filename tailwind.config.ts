import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        darkBlue: "#161250",
        hoverColor:'#191280',
        violet: "#9D9DBC"
      },
      borderWidth: {
        1:'1px'
      },
      fontFamily: {
        'poppins': ['Poppins'],
     }
=======
      colors: {
        "background-light": "#ECF1F8",
      }
>>>>>>> 260196be67f598b853b712a5bc2be7ad2d78d871
    },
  },
  plugins: [],
};
export default config;
