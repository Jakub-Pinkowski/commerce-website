<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;

	let searchQuery = '';

	$: filteredProducts = products?.filter(
		(product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.category.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<div>
	<div class="breadcrumbs mb-6 text-xs">
		<ul>
			<li><a href="/">Home</a></li>
			<li>Search</li>
		</ul>
	</div>
	<h1 class="mb-4 text-3xl font-bold">Search</h1>
	<input type="text" class="my-6 bg-slate-200" bind:value={searchQuery} />
	<!-- TODO: Add filters to search and categories -->

	{#if filteredProducts && filteredProducts.length > 0}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each filteredProducts as product}
				<CategoryProductCard {product} />
			{/each}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
