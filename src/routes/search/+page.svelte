<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';

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
	<h1>Search</h1>
	<input type="text" class="my-6 bg-slate-200" bind:value={searchQuery} />

	{#if filteredProducts && filteredProducts.length > 0}
		{#each filteredProducts as product}
			<p>{product.name}</p>
		{/each}
	{:else}
		<p>No products found</p>
	{/if}
</div>
