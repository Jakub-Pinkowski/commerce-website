<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'New');
	let saleProducts = products.filter((product) => product.price < product.listPrice);
</script>

<div>
	<h1 class="mb-4 text-3xl font-bold">Categories</h1>
	{#if newProducts}
		<div>
			<h2 class="mb-4 text-2xl font-bold">New</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each newProducts.slice(0, 4) as product}
					<CategoryProductCard {product} />
				{/each}
			</div>
		</div>
	{/if}
	{#if saleProducts}
		<div>
			<h2 class="mb-4 text-2xl font-bold">Sale</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each saleProducts.slice(0, 4) as product}
					<CategoryProductCard {product} />
				{/each}
			</div>
		</div>
	{/if}
</div>
