/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: '#262626', // Dark Grey
				whiteish: '#f0f0f0', // Light Grey
				primary: '#3f594b', // Dark Green
				secondary: '#2a9d8f', // Light Green
				'dark-primary': '#2A3C32', // Darker Green
				accent: '#e9c46a', // Yellow
				'light-accent': '#f7eaca', // Light Yellow
				'secondary-accent': '#f4a261', // Orange
				'dark-secondary-accent': '#e76f51', // Dark Orange
				'main-red': '#e63946', // Red
                'tier-bronze': '#cd7f32', // Bronze
                'tier-silver': '#c0c0c0', // Silver
                'tier-gold': '#ffd700', // Gold
                'tier-platinum': '#e5e4e2', // Platinum
                'tier-diamond': '#b9f2ff', // Diamond
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#3f594b', // Dark Green
					secondary: '#2a9d8f', // Light Green
					accent: '#e9c46a' // Yellow
				}
			}
		]
	}
};
