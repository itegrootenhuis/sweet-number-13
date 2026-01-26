/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#9FEAF0",   // Brand Aqua
          coral: "#FF8F6B",     // Coral Pop
          peach: "#F7B7A0",     // Soft Peach
          seafoam: "#66C7B7",   // Seafoam Mint
          mintWash: "#CFEFE8",  // Pale Mint Wash
          surface: "#FAFAF7",   // Warm Off-White
          muted: "#BFC7C3",     // Coastal Gray
          text: "#2F2F2F",      // Espresso Charcoal
          textMuted: "#5F5F5F", // Secondary Text
          textSubtle: "#8A8A8A" // Labels / Hints
        }
      },
      boxShadow: {
        soft: "0 8px 16px rgba(0, 0, 0, 0.12)"
      }
    }
  },
  plugins: []
}
