/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4CAF50',
          main: '#2E7D32',
          dark: '#1B5E20',
        },
        secondary: {
          light: '#FFB74D',
          main: '#F57C00',
          dark: '#E65100',
        },
        accent: {
          light: '#42A5F5',
          main: '#1976D2',
          dark: '#1565C0',
        },
        background: {
          default: '#FFFFFF',
          paper: '#F5F5F5',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
          disabled: '#9E9E9E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(0,0,0,0.1)',
        'elevation-2': '0 4px 8px rgba(0,0,0,0.1)',
        'elevation-3': '0 8px 16px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
} 