// tailwind.config.js
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // 1. PALETA DE CORES OTIMIZADA
      colors: {
        background: '#000000',      // Absolute Black
        surface: '#0A0A0A',         // Deep Gray
        'surface-highlight': '#1A1A1A', // Lighter Gray for hover

        // Neutral tones
        neutral: {
          950: '#050505',
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#404040',
          500: '#525252',
          400: '#737373',
          300: '#A3A3A3',
          200: '#E5E5E5',
          100: '#F5F5F5',
        },

        // Accent Colors (Subtle Metallic/Glass)
        primary: '#FFFFFF',         // High contrast white
        accent: '#333333',          // Metallic Gray

        // Text Colors
        foreground: '#FFFFFF',      // Primary text
        'foreground-muted': '#888888', // Secondary text
      },

      // 2. FUNDO GRANULADO REUTILIZÁVEL
      backgroundImage: {
        'grainy-gradient': "linear-gradient(175deg, theme('colors.neutral.800'), theme('colors.neutral.950')), url('assets/textures/noise.svg')",
      },

      // 3. FONTE PADRÃO (BOA PRÁTICA)
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
})
