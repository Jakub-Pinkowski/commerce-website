<script>
	import './styles.css';
</script>

<div class="app">
	<header>
		<h1>Commerce website</h1>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	footer {
	}
</style>
