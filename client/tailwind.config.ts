import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  "50":  "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemeObject = (colors: any, mapping: any, invert = false) => {
const theme: any = {};
baseColors.forEach((color) => {
  theme[color] = {};
  Object.entries(mapping).forEach(([key, value]: any)=> {
    const shadeKey = invert ? value : key;
    theme[color][key] = colors[color][shadeKey];
  });
});
return theme;
}

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff"
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"]
  }
}

const config: Config = {
  darkMode: "class",
  important: true, 
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
        brand: {
          DEFAULT: "#4f46e5",
          indigo: "#4f46e5",
        },
        mint: "#4edea3",
        "rose-gold": "#ffb2b9",
        obsidian: {
          DEFAULT: "#0c0e12",
          base: "#05070a",
          charcoal: "#111417",
          dim: "#191c1f",
          surface: "#1d2023",
          high: "#282a2e",
          highest: "#323539",
          glass: "rgba(29, 32, 35, 0.6)",
        },
      },
      borderRadius: {
        custom: "12px",
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;
