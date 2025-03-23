/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#272757',
        'primary-light': '#505081',
        'primary-mid': '#8686ac',
        'accent': '#0f0e46',
        'text-light': '#fafafa',
        'text-dark': '#282630',

      },
    },
  },
  plugins: [],
};
