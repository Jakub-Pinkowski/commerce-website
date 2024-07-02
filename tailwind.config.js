/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: 'rgb(38, 38, 38)'
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
                    primary: '#3f594b', // Dark green
                    secondary: '#2a9d8f', // Light green
                    accent: '#e9c46a', // Yellow
                    "secondary-accent": '#f4a261', // Orange
                    "dark-accent": '#e76f51', // Dark Orange
                    whiteish: '#f0f0f0'
				}
			}
		]
	}
};
