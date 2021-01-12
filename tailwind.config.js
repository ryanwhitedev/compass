module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
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
    minWidth: {
      menu: "140px",
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
