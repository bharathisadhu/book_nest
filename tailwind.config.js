/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   Community:
      //     "url('https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/h6_bg1.jpg')",
      //   branding:
      //     "url('https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg')",
      //   userProfileBG:
      //     "url('https://i.ibb.co.com/7X60NZ2/user-Profile-BG.png')",
      // },

      backgroundImage: {
        Community:
          "url('https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/h6_bg1.jpg')",
        branding:
          "url('https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg')",
        userProfileBG: "url('https://i.ibb.co/7X60NZ2/user-Profile-BG.png')",
      },

      fontFamily: {
        poppins: "Poppins, sans-serif", // Adds a new `font-display` class
        roboto: "Roboto, sans-serif",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave", "retro"],
  },
  plugins: [require("daisyui", "tailwindcss-react-aria-components")],
};
