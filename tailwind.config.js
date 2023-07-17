/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sent-serif"],
      Poppins: ["Poppins", "sant-serif"],
      Mukta: ["Mukta Vaani", "sant-serif"],
    },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "100%": {
            borderColor: "#e40414",
          },
        },
        scroll: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(calc(-250px * 14))" },
        },
      },
      animation: {
        typing: "typing 3s steps(40) infinite alternate, blink 4s infinite",
        // marquee-slower: "marquee 30s linear infinite",
        scroll: "scroll 30s linear infinite",
        // marquee-faster: "marquee 15s linear infinite",
        // scroll-slower: "scroll 15s linear infinite",
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
};
