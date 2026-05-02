/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wisdom-primary':   '#BE97C6',
        'wisdom-white':     '#FDFFFC',
        'wisdom-text':      '#4B5267',
        'wisdom-sidebar':   '#634587',
        'wisdom-highlight': '#325F85',
      },
    },
  },
  plugins: [],
}
