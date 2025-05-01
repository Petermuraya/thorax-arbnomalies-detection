/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", // For shadcn/ui compatibility
        medical: {
          blue: "#3b82f6",
          "blue-dark": "#2563eb",
          gray: {
            light: "#f3f4f6",
            dark: "#374151",
          },
        },
      },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: theme('colors.medical.gray.light', 'currentColor'),
      }),
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "bounce-horizontal": "bounce-horizontal 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(10px) translateX(-15px)" },
        },
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
}