/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "100": "#2c114f",
        "200": "#22133a",
        "300": "#1d152d",
        "400": "#140e20",
        "500": "#0e0818"
      },
      height: {
        "mainHeight": "calc(100svh - 7rem)"
      },
      flex: {
        "2": "2"
      }
    },
  },
  plugins: [],
}

