/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Le vert turquoise typique de padel
        padel: "#09B1BA",
      }
    },
  },
  plugins: [],
}

