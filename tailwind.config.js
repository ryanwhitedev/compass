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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
