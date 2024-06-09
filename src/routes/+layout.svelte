<script>
    import Header from '../lib/Header.svelte';
    import Footer from '../lib/Footer.svelte';
	import "../app.css";
</script>

<div class="app">
    <Header />

	<main>
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
