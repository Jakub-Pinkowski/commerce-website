<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	export let products = data?.products;

	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
</script>

<div>
	<h1 class="mb-4 text-3xl font-bold">New</h1>
	{#if products}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each products as product}
				<CategoryProductCard {product} />
			{/each}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
	<!-- TODO: Recommendation carousel goes here -->
</div>
