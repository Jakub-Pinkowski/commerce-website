<script>
    import Header from '../lib/Header.svelte';
	import "../app.css";
</script>

<div class="app">
    <Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	footer {
	}
</style>
