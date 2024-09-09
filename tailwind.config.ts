import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(
    {
      themes: {
        dark: {
          colors: {
            // primary: "#14FF98",
            focus: "yellow",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#002E1A",
              foreground:"white"
            },
            focus: "yellow",
          },
        },
      }
    }
  )],
};
export default config;
