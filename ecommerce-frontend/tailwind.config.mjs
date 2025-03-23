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
        'primary-dark': '#272757'   ,    // Darkest blue
        'primary-light': '#505081',      // Medium blue
        'primary-mid': '#8686ac',        // Dark blue
        'accent':'#0f0e46' ,             // Light blue/purple
        'text-light': '#fafafa',    //white text
        'text-dark': '#282630',  //dark text
      },
    },
  },
  plugins: [],
};
