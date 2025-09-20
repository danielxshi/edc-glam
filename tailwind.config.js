const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["var(--font-geist-sans)"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        // (optional) move blink here if you want it as a keyframe:
        // blink: {
        //   "0%": { opacity: 0.2 },
        //   "20%": { opacity: 1 },
        //   "100%": { opacity: 0.2 },
        // },
      },
      blink: {
        "0%": { opacity: 0.2 },
        "20%": { opacity: 1 },
        "100%": { opacity: 0.2 },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        blink: "blink 1.4s both infinite",
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xlg: ["1.25rem", { lineHeight: "1.75rem" }],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    plugin(({ matchUtilities, theme, addUtilities }) => {
      matchUtilities(
        {
          "animation-delay": (value) => ({ "animation-delay": value }),
        },
        { values: theme("transitionDelay") }
      );

      // 👇 Add your text-shadow utility
      addUtilities({
        ".text-shadow-hero": {
          textShadow:
            "0 1px 1px rgba(0,0,0,.35), 0 3px 6px rgba(0,0,0,.18)",
        },
      });
    }),
  ],
};
