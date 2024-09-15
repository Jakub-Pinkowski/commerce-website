import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: []
			}
		})
	}
};

export default config;
