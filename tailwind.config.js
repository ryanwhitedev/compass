module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        current: "currentColor",
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
        mobileNav: "auto 1fr auto",
      },
    },
    screens: {
      xs: "440px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
