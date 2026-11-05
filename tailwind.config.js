/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corporate: {
          navy: '#202938',       // Primary Header, active sidebar, buttons
          slate: '#64748B',      // Secondary text, muted icons
          softGray: '#F3F4F6',   // App canvas background
          surface: '#FFFFFF',    // Cards and modal containers
          border: '#E2E8F0',     // Dividers and input borders
          slateLighter: '#F1F5F9', // Subtle chips and hover states
          slateDark: '#334155',  // Hover states for dark buttons
        },
        status: {
          success: '#10B981',
          danger: '#DC2626',
          warning: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

