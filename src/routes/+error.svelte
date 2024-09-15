<script lang="ts">
	import { page } from '$app/stores';
	import desert from '$lib/assets/images/desert.webp';
</script>

<section
	class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
	style="background-image: url({desert});"
>
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-2xl">
			<h1 class="mb-8 text-5xl">Error {$page.status}: {$page.error?.message}</h1>
            {#if $page.status === 404}
                <p class="mb-8 text-4xl">Looks like this page doesn't exist</p>
            {:else}
                <p class="mb-8 text-4xl">An error occurred</p>
            {/if}
			<a href="/" class="btn btn-accent">Homepage</a>
		</div>
	</div>
</section>
