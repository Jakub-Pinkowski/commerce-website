<script lang="ts">
	import Header from '../lib/components/Header/Header.svelte';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import '../app.css';

	let { children } = $props();

	// Disable Vercel Analytics and Speed Insights on Safari
	const isSafari = () => {
		return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	};

	if (typeof window !== 'undefined' && !isSafari()) {
		import('@vercel/analytics').then(({ inject }) => inject());
		import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) =>
			injectSpeedInsights()
		);
	}
</script>

<svelte:head>
	<title>E-commerce website</title>
	<meta name="description" content="E-commerce website" />
	<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
	<link rel="apple-touch-icon-precomposed" href="/favicons/apple-icon-precomposed.png" />
	<link rel="apple-touch-icon" href="/favicons/apple-icon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="36x36" href="/favicons/android-icon-36x36.png" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicons/android-icon-48x48.png" />
	<link rel="icon" type="image/png" sizes="72x72" href="/favicons/android-icon-72x72.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicons/android-icon-96x96.png" />
	<link rel="icon" type="image/png" sizes="144x144" href="/favicons/android-icon-144x144.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
	<link rel="manifest" href="/favicons/manifest.json" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="app">
	<Header />

	<main class="p-6 md:p-8">
		{@render children()}
	</main>

	<Footer />
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
