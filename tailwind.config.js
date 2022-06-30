module.exports = {
  theme: {
    extend: {
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2563eb",
          "secondary": "#d6d3d1",
          "accent": "#1FB2A6",
          "neutral": "#1f2937",
          "base-100": "#e5e7eb",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      {
        dark: {
          "primary": "#2563eb",
          "secondary": "#d6d3d1",
          "accent": "#1FB2A6",
          "neutral": "#1f2937",
          "base-100": "#1c1917",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")]
}