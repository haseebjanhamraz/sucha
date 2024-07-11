/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        // Define your light and dark theme colors
        light: {
          primary: "#ffffff", // Example light primary color
          secondary: "#f0f0f0", // Example light secondary color
          // Add more light theme colors as needed
        },
        dark: {
          primary: "#333333", // Example dark primary color
          secondary: "#1a1a1a", // Example dark secondary color
          // Add more dark theme colors as needed
        },
      },
    },
  },

  plugins: [],
};
