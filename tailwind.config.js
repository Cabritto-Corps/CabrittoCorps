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
        background: '#0D0D1A',      // O fundo mais profundo
        surface: '#1A1A2E',         // Cor para 'cards' e superfícies elevadas

        // Tons neutros para os gradientes "foscos"
        neutral: {
          950: '#050509',
          900: '#111118',
          800: '#1f1f29',
          700: '#30303d',
        },

        // Cores de destaque
        primary: '#E0218A',
        accent: '#0EF5D4',

        // Cores para texto e conteúdo (nova nomenclatura)
        foreground: '#F0F0F0',      // Cor principal para textos
        'foreground-muted': '#A0A0B0', // Cor para textos secundários
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
