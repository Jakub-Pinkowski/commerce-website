<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let productsPerPage = 8;
	let categories = ['New', 'Sale', 'All'];
	let newProducts = products.filter((product) => product.label === 'New').slice(0, productsPerPage);
	let saleProducts = products
		.filter((product) => product.price < product.listPrice)
		.slice(0, productsPerPage);
	products = products.slice(0, productsPerPage);

	let activeTab: string = 'New';
</script>

<div>
	{#if products}
		<div class="tabs-boxed tabs mb-4 flex w-96 justify-between" role="tablist">
			{#each categories as category (category)}
				<button
					class="tab flex-1 {activeTab === category ? 'tab-active' : ''}"
					on:click={() => (activeTab = category)}>{category}</button
				>
			{/each}
		</div>

		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#if activeTab === 'New' && newProducts.length}
				{#each newProducts as product}
					<CategoryProductCard {product} />
				{/each}
			{/if}
		</div>

		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#if activeTab === 'Sale' && newProducts.length}
				{#each saleProducts as product}
					<CategoryProductCard {product} />
				{/each}
			{/if}
		</div>

		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#if activeTab === 'All' && products.length}
				{#each products as product}
					<CategoryProductCard {product} />
				{/each}
			{/if}
		</div>

		<div class="mt-8 flex justify-center">
			<a
				href={`/${activeTab === 'All' ? 'products' : 'categories/' + activeTab.toLowerCase()}`}
				class="btn btn-accent"
			>
				{#if activeTab === 'All'}View all products{:else}View all {activeTab} products{/if}
			</a>
		</div>
		<RecommendationsCarousel {products} />
	{:else}
		<p>No products found</p>
	{/if}
</div>
