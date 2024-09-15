<script lang="ts">
	import desert from '$lib/assets/images/desert.webp';
</script>

<section
	class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
	style="background-image: url({desert});"
>
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-2xl">
			<h1 class="mb-8 text-5xl">Error 404: Not Found</h1>
			<p class="mb-8 text-4xl">Looks like this page doesn't exist</p>
			<a href="/" class="btn btn-accent">Homepage</a>
		</div>
	</div>
</section>
