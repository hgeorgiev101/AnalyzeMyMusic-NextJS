module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      scale: {
        40: ".40",
      },
    },
  },
  variants: {
    extend: {
      width: ["responsive", "hover", "focus"],
      height: ["responsive", "hover", "focus"],
      padding: ["responsive", "hover", "focus"],
      borderRadius: ["responsive", "hover"],
      scale: ["responsive", "hover", "focus", "active"],
    },
  },
  plugins: [],
};
