// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // ⛔ Add this line to disable lightningcss
  future: {
    useFutureCss: false,
  },
}
