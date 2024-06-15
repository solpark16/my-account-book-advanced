/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "10px": "10px",
        "30px": "30px",
      },
      colors: {
        "input-border-gray": "#c4c4c4",
      },
    },
  },
  plugins: [],
};
