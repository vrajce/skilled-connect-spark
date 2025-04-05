
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Enhanced theme colors for better UI
        skilled: {
          primary: '#8B5CF6',
          secondary: '#D946EF',
          accent: '#F97316',
          highlight: '#0EA5E9',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          // Additional colors for vibrant UI
          indigo: '#6366F1',
          cyan: '#06B6D4',
          rose: '#F43F5E',
          emerald: '#10B981',
          amber: '#F59E0B',
          teal: '#14B8A6',
          fuchsia: '#D946EF'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        },
        // Enhanced animations for next-gen effects
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(139, 92, 246, 0.8)" }
        },
        "blur-in": {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" }
        },
        "morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-right": "fade-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        // Enhanced animation mappings
        "ripple": "ripple 1s ease-out forwards",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "blur-in": "blur-in 0.5s ease-out forwards",
        "morph": "morph 8s ease-in-out infinite"
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
        // Enhanced gradients for vibrant UI
        'gradient-cosmic': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%)',
        'gradient-neon': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #34D399 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F43F5E 0%, #EC4899 50%, #8B5CF6 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #0D9488 100%)'
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.5)',
        'glow-md': '0 0 15px rgba(139, 92, 246, 0.6)',
        'glow-lg': '0 0 25px rgba(139, 92, 246, 0.7)',
        'neon-sm': '0 0 5px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'neon-md': '0 0 10px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)',
        'neon-lg': '0 0 15px rgba(6, 182, 212, 0.7), 0 0 40px rgba(6, 182, 212, 0.5)'
      },
      backdropFilter: {
        'none': 'none',
        'blur-sm': 'blur(4px)',
        'blur': 'blur(8px)',
        'blur-md': 'blur(12px)',
        'blur-lg': 'blur(16px)',
        'blur-xl': 'blur(24px)',
        'blur-2xl': 'blur(40px)',
        'blur-3xl': 'blur(64px)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
