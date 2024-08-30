<script>
	import { inject } from '@vercel/analytics';
	import Header from '../lib/Header/Header.svelte';
	import Footer from '../lib/Footer.svelte';
	import '../app.css';

	inject();
</script>

<div class="app">
	<Header />

	<main class="p-6 md:p-8">
		<slot />
	</main>

	<Footer />
</div>

<!-- TODO: Do something about the photos -->
<!-- Store them locally
Generate them -->

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
