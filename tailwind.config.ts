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
        "siri-core": {
          "0%, 100%": { 
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(59, 130, 246, 0.1)"
          },
          "50%": { 
            transform: "scale(1.1)",
            boxShadow: "0 0 30px rgba(255, 255, 255, 1), inset 0 0 30px rgba(59, 130, 246, 0.2)"
          }
        },
        "siri-wave-1": {
          "0%": { 
            transform: "rotate(0deg) scale(1)",
            opacity: "0.4"
          },
          "50%": { 
            transform: "rotate(180deg) scale(1.3)",
            opacity: "0.7"
          },
          "100%": { 
            transform: "rotate(360deg) scale(1)",
            opacity: "0.4"
          }
        },
        "siri-wave-2": {
          "0%": { 
            transform: "rotate(120deg) scale(0.8)",
            opacity: "0.3"
          },
          "50%": { 
            transform: "rotate(300deg) scale(1.4)",
            opacity: "0.6"
          },
          "100%": { 
            transform: "rotate(480deg) scale(0.8)",
            opacity: "0.3"
          }
        },
        "siri-wave-3": {
          "0%": { 
            transform: "rotate(240deg) scale(1.1)",
            opacity: "0.35"
          },
          "50%": { 
            transform: "rotate(60deg) scale(0.7)",
            opacity: "0.65"
          },
          "100%": { 
            transform: "rotate(-120deg) scale(1.1)",
            opacity: "0.35"
          }
        },
        "siri-wave-4": {
          "0%": { 
            transform: "rotate(300deg) scale(0.9)",
            opacity: "0.25"
          },
          "50%": { 
            transform: "rotate(120deg) scale(1.5)",
            opacity: "0.5"
          },
          "100%": { 
            transform: "rotate(-60deg) scale(0.9)",
            opacity: "0.25"
          }
        },
        "siri-shimmer": {
          "0%": { transform: "translateX(-100%) rotate(45deg)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%) rotate(45deg)", opacity: "0" }
        },
        "siri-glow": {
          "0%, 100%": { 
            opacity: "0.3",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.7",
            transform: "scale(1.2)"
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
        "siri-core": "siri-core 3s ease-in-out infinite",
        "siri-wave-1": "siri-wave-1 8s linear infinite",
        "siri-wave-2": "siri-wave-2 12s linear infinite reverse",
        "siri-wave-3": "siri-wave-3 10s linear infinite",
        "siri-wave-4": "siri-wave-4 14s linear infinite reverse",
        "siri-shimmer": "siri-shimmer 4s ease-in-out infinite",
        "siri-glow": "siri-glow 5s ease-in-out infinite"
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;