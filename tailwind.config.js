/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
        'background':'#eeeff1',
        'orange':'#e48048',
        'blue': '#5b8fbd',
        'purple':'#3618ee',
        'yellow':'#fcf29d',
        'grey':'#696969'
      },
      animation: {
        // 'spin-slow': 'spin 6s cubic-bezier(0.42, 0, 0.58, 1) infine',
        'spin-slow': 'spin 3s ease-out',
      }
    }
  },
  plugins: [],
}

