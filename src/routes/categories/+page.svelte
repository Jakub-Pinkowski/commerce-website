<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'New');
	let saleProducts = products.filter((product) => product.price < product.listPrice);
</script>

<div>
	<h1 class="mb-4 text-3xl font-bold">Categories</h1>
	{#if newProducts}
		<RecommendationsCarousel products={newProducts} title="New" />
        <!-- NOTE: Haven't decided on the color of the button yet -->
		<div class="flex justify-center">
			<a href="/categories/new" class="btn btn-primary"> View all new products </a>
		</div>
	{/if}
	{#if saleProducts}
		<RecommendationsCarousel products={saleProducts} title="Sale" />
		<div class="flex justify-center">
			<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
		</div>
	{/if}
	{#if products}
		<RecommendationsCarousel {products} title="All products" />
		<div class="flex justify-center">
			<a href="/products/" class="btn btn-accent"> View all products </a>
		</div>
	{/if}
</div>
