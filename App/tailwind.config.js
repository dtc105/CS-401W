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
        "500": "#0e0818",
      },
      borderRadius: {
        "circle": "50%"
      },
      width: {
        "smscreen": "100svw"
      },
      height: {
        "mainHeight": "calc(100svh - 7rem)",
        "smscreen": "100svh"
      },
      flex: {
        "2": "2"
      },
      borderRadius: {
        "circle": "50%"
      },
      spacing: {
        "1/3": "33.33333333%",
        "1/3s": "33svh",
        "7/12": "58.33333333%",
        "5/8": "62.5%",
        "2/3": "66.66666666%",
        "3/4": "75%"
      }
    },
  },
  plugins: [],
}

