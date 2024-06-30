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
		themes: ['light']
	}
};
