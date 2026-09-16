/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        exam: {
          header: '#1b1b1b',
          footer: '#efefef',
          flag: '#d0e1ed',
          flagActive: '#4a7fa7',
          flagActiveText: '#ffffff',
          border: '#dcdcdc',
        },
      },
    },
  },
  plugins: [],
}
