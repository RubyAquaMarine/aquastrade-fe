import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkest: "hsl(230, 38%, 5%)",
        lessDarker: "hsl(230, 30%, 9%)",
        light: "#1e2433",
        smth: "#262D40",
        moreLighter: "#374151",
        lightest: "#475569",
        toxicBlue: "#26C6DA",
        toxicPurple: "#DA00B2",
        textMain: "white",
        textSecondary: "#9ca3af",
        up: "rgba(38,198,218, 0.56)",
        down: "rgba(239,83,80, 0.4)",
        secUp: "#047D74",
        secDown: "#D04749",
        sellColor: "#DA2C38",
        buyColor: "#00916E",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      maxWidth: {
        "28": "7rem",
        "32": "8rem",
      },
      minWidth: {
        "28": "7rem",
        minW: "5rem",
        minWForm: "15rem",
      },
      zIndex: {
        "10000": "10000",
      },
      screen: {},
    },
  },
  plugins: [],
};
export default config;
