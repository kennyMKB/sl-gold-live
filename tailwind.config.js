
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { bg: '#0b1220', card: '#0f172a', gold: '#FFD700', accent: '#F59E0B' }
      },
      keyframes: {
        neonSpin: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        ticker: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(-100%)' } }
      },
      animation: { neonSpin: 'neonSpin 6s linear infinite', ticker: 'ticker 25s linear infinite' }
    }
  },
  plugins: []
}
