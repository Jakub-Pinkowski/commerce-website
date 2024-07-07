<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let productsPerPage = 8;
	let categories = ['New', 'Sale', 'Best Sellers'];
	let newProducts = products.filter((product) => product.label === 'new').slice(0, productsPerPage);
	let saleProducts = products
		.filter((product) => product.price < product.listPrice)
		.slice(0, productsPerPage);
	products = products.slice(0, productsPerPage);
	// TODO: Introduce real bestSellers later
	let bestSellerProducts = products.slice(0, productsPerPage);

	let activeTab: string = 'New';
</script>

<div>
	{#if products}
		<!-- TODO: Animate the buttons -->
		<div class="tabs-boxed tabs mb-4 flex w-full justify-between md:w-96" role="tablist">
			{#each categories as category (category)}
				<button
					class="tab flex-1 {activeTab === category ? 'tab-active' : ''}"
					on:click={() => (activeTab = category)}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- TODO: Possibly animate those as well, using svelte transitions -->
		{#if activeTab === 'New' && newProducts.length}
			<div class="mb-8">
				<RecommendationsCarousel products={newProducts} title="New" />
				<div class="flex justify-center">
					<a href="/categories/new" class="btn btn-accent"> View all new prodducts </a>
				</div>
			</div>
		{/if}

		{#if activeTab === 'Sale' && newProducts.length}
			<div class="mb-8">
				<RecommendationsCarousel products={saleProducts} title="Sale" />
				<div class="flex justify-center">
					<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
				</div>
			</div>
		{/if}

		{#if activeTab === 'Best Sellers' && products.length}
			<div class="mb-8">
				<RecommendationsCarousel products={bestSellerProducts} title="Best Sellers" />
				<div class="flex justify-center">
					<a href="/categories/best-sellers" class="btn btn-accent"> View all best sellers </a>
				</div>
			</div>
		{/if}

	{:else}
		<p>No products found</p>
	{/if}
</div>
