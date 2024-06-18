/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#1a202c", // Aquí puedes poner tu color personalizado
        "customT-bg": "#0066FE", // Aquí puedes poner tu color personalizado
      },
    },
  },
  plugins: [],
};
