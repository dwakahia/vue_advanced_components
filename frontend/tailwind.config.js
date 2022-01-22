module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    // "./index.html",
    // "./assets/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@themesberg/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin')
  ],
}
