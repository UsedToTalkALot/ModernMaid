/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    content: [
      "./src/pages/Home.tsx",
      "./src/assets/css/Home.css",
      "./src/pages/Home.tsx",
      "./src/assets/css/Header.css",
      "./src/admin/createpaint.tsx"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
