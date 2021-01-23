module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      backgroundImage: {
        contour: "url(./bgContourLines.svg)",
      },
      colors: {
        current: "currentColor",
        black: "#222222",
        orange: {
          light: "#ff6d38",
          DEFAULT: "#ff4400",
          dark: "#d63900",
        },
      },
      flex: {
        fw: "0 0 100%",
      },
      gridTemplateColumns: {
        "auto-fr-auto": "auto 1fr auto",
        "auto-fr-auto-auto": "auto 1fr auto auto",
      },
      inset: {
        initial: "initial",
      },
      maxWidth: {
        "500px": "500px",
      },
      minWidth: {
        menu: "155px",
      },
    },
    screens: {
      xs: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
    },
  },
  plugins: [],
};
