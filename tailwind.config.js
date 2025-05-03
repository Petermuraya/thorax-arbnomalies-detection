
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        medical: {
          blue: {
            light: '#4285F4',
            DEFAULT: "#3b82f6",
            dark: "#2563eb",
          },
          teal: {
            light: '#42E9D9',
            DEFAULT: '#20C997',
            dark: '#0D9B79'
          },
          gray: {
            lightest: '#F8F9FA',
            light: "#f3f4f6",
            DEFAULT: '#6C757D',
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
