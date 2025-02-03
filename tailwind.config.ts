import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "vibrant-pink": "#FF1493",
        "electric-blue": "#00FFFF",
        "neon-green": "#39FF14",
        "sunny-yellow": "#FFD700",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        colorful: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#FF1493",
          secondary: "#00FFFF",
          accent: "#39FF14",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
} satisfies Config;
