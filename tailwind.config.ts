import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass))",
          border: "hsl(var(--glass-border))",
          shadow: "hsl(var(--glass-shadow))",
        },
        window: {
          red: "hsl(var(--window-red))",
          yellow: "hsl(var(--window-yellow))",
          green: "hsl(var(--window-green))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "siri-core-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.6)"
          },
          "50%": { 
            transform: "scale(1.2)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)"
          }
        },
        "siri-wave-blue": {
          "0%": { 
            transform: "rotate(0deg) scale(0.8) skewX(0deg)",
            opacity: "0.5"
          },
          "25%": { 
            transform: "rotate(90deg) scale(1.3) skewX(10deg)",
            opacity: "0.7"
          },
          "50%": { 
            transform: "rotate(180deg) scale(1.1) skewX(-5deg)",
            opacity: "0.6"
          },
          "75%": { 
            transform: "rotate(270deg) scale(1.4) skewX(15deg)",
            opacity: "0.8"
          },
          "100%": { 
            transform: "rotate(360deg) scale(0.8) skewX(0deg)",
            opacity: "0.5"
          }
        },
        "siri-wave-aqua": {
          "0%": { 
            transform: "rotate(45deg) scale(1.2) skewY(5deg)",
            opacity: "0.45"
          },
          "33%": { 
            transform: "rotate(165deg) scale(0.9) skewY(-10deg)",
            opacity: "0.65"
          },
          "66%": { 
            transform: "rotate(285deg) scale(1.5) skewY(8deg)",
            opacity: "0.75"
          },
          "100%": { 
            transform: "rotate(405deg) scale(1.2) skewY(5deg)",
            opacity: "0.45"
          }
        },
        "siri-wave-pink": {
          "0%": { 
            transform: "rotate(120deg) scale(1.1) skewX(-8deg)",
            opacity: "0.4"
          },
          "40%": { 
            transform: "rotate(240deg) scale(1.6) skewX(12deg)",
            opacity: "0.7"
          },
          "80%": { 
            transform: "rotate(360deg) scale(0.7) skewX(-3deg)",
            opacity: "0.5"
          },
          "100%": { 
            transform: "rotate(480deg) scale(1.1) skewX(-8deg)",
            opacity: "0.4"
          }
        },
        "siri-wave-purple": {
          "0%": { 
            transform: "rotate(200deg) scale(0.9) skewY(-12deg)",
            opacity: "0.45"
          },
          "30%": { 
            transform: "rotate(300deg) scale(1.4) skewY(6deg)",
            opacity: "0.8"
          },
          "70%": { 
            transform: "rotate(420deg) scale(1.2) skewY(-4deg)",
            opacity: "0.6"
          },
          "100%": { 
            transform: "rotate(560deg) scale(0.9) skewY(-12deg)",
            opacity: "0.45"
          }
        },
        "siri-flow-1": {
          "0%": { transform: "rotate(0deg) translateX(2px)", opacity: "0.2" },
          "50%": { transform: "rotate(180deg) translateX(-3px)", opacity: "0.4" },
          "100%": { transform: "rotate(360deg) translateX(2px)", opacity: "0.2" }
        },
        "siri-flow-2": {
          "0%": { transform: "rotate(180deg) translateY(-2px)", opacity: "0.15" },
          "50%": { transform: "rotate(0deg) translateY(3px)", opacity: "0.35" },
          "100%": { transform: "rotate(-180deg) translateY(-2px)", opacity: "0.15" }
        },
        "siri-outer-glow": {
          "0%, 100%": { 
            opacity: "0.3",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.6",
            transform: "scale(1.1)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "slide-up": "slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "siri-core-pulse": "siri-core-pulse 2s ease-in-out infinite",
        "siri-wave-blue": "siri-wave-blue 12s linear infinite",
        "siri-wave-aqua": "siri-wave-aqua 15s linear infinite reverse",
        "siri-wave-pink": "siri-wave-pink 10s linear infinite",
        "siri-wave-purple": "siri-wave-purple 18s linear infinite reverse",
        "siri-flow-1": "siri-flow-1 8s ease-in-out infinite",
        "siri-flow-2": "siri-flow-2 11s ease-in-out infinite reverse",
        "siri-outer-glow": "siri-outer-glow 4s ease-in-out infinite"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;