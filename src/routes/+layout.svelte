<script>
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
	import MiniCart from '../lib/MiniCart.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />
	<MiniCart />

	<main class="p-6 md:p-8">
		<slot />
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
