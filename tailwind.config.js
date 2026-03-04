/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  'rpg': {
			darker: '#020617',
			dark: '#0f172a',
			panel: '#1e293b',
			border: '#334155',
			light: '#475569',
		  },
		  // Raretés d'items
		  'common': '#9ca3af',
		  'uncommon': '#22c55e',
		  'rare': '#3b82f6',
		  'epic': '#a855f7',
		  'legendary': '#f59e0b',
		  'mythic': '#ef4444',
		  // Stats
		  'hp': '#dc2626',
		  'mp': '#2563eb',
		  'stamina': '#ca8a04',
		  'xp': '#9333ea',
		  'gold': '#fbbf24',
		  // Classes
		  'warrior': '#dc2626',
		  'mage': '#2563eb',
		  'rogue': '#16a34a',
		  'ranger': '#d97706',
		},
		
		fontFamily: {
		  'pixel': ['"Press Start 2P"', 'cursive'],
		  'rpg': ['"Cinzel"', 'serif'],
		  'ui': ['"Inter"', 'system-ui', 'sans-serif'],
		},
		
		animation: {
		  'float': 'float 3s ease-in-out infinite',
		  'shake': 'shake 0.5s ease-in-out',
		  'glow': 'glow 2s ease-in-out infinite alternate',
		  'damage': 'damage 0.8s ease-out forwards',
		  'level-up': 'levelUp 1s ease-out',
		  'pulse-slow': 'pulse 3s ease-in-out infinite',
		  'crt': 'crt 0.1s infinite',
		},
		
		keyframes: {
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-10px)' },
		  },
		  shake: {
			'0%, 100%': { transform: 'translateX(0)' },
			'25%': { transform: 'translateX(-5px)' },
			'75%': { transform: 'translateX(5px)' },
		  },
		  glow: {
			'from': { boxShadow: '0 0 5px currentColor' },
			'to': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
		  },
		  damage: {
			'0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
			'50%': { transform: 'translateY(-20px) scale(1.5)', opacity: '1' },
			'100%': { transform: 'translateY(-40px) scale(1)', opacity: '0' },
		  },
		  levelUp: {
			'0%': { transform: 'scale(1)', filter: 'brightness(1)' },
			'50%': { transform: 'scale(1.2)', filter: 'brightness(2)' },
			'100%': { transform: 'scale(1)', filter: 'brightness(1)' },
		  },
		  crt: {
			'0%': { transform: 'translate(0)' },
			'20%': { transform: 'translate(-2px, 2px)' },
			'40%': { transform: 'translate(-2px, -2px)' },
			'60%': { transform: 'translate(2px, 2px)' },
			'80%': { transform: 'translate(2px, -2px)' },
			'100%': { transform: 'translate(0)' },
		  },
		},
		
		boxShadow: {
		  'rpg': '4px 4px 0px 0px rgba(0, 0, 0, 0.5)',
		  'rpg-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.5)',
		  'rpg-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.5)',
		  'glow-gold': '0 0 20px rgba(251, 191, 36, 0.5)',
		  'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
		  'glow-blue': '0 0 20px rgba(37, 99, 235, 0.5)',
		  'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
		},
		
		spacing: {
		  '18': '4.5rem',
		  '88': '22rem',
		  '128': '32rem',
		},
		
		borderWidth: {
		  '3': '3px',
		},
		
		borderRadius: {
		  'rpg': '0.5rem',
		  'pixel': '0.25rem',
		},
	  },
	},
	plugins: [],
  }