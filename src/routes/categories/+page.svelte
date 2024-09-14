<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import SkeletonRecommendationsCarousel from '$lib/components/Common/SkeletonRecommendationsCarousel.svelte';

	export let data: PageData;

	function delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function fetchProducts(data: PageData): Promise<Product[]> {
		await delay(2000); // Simulate delay for testing
		if (data?.products) {
			return data.products as Product[];
		} else {
			throw new Error('Products not found');
		}
	}

	const productsPromise = fetchProducts(data);

	let breadcrumbs = ['Home', 'Categories'];
	let productsPerCarousel = 8;
	let mainCategories = ['New', 'Sale', 'Best Sellers'];
	let activeTabMainCategory: string = 'New';
	let productCategories = ['Shoes', 'Backpacks', 'Caps', 'Bikes'];
	let activeTabProductCategory: string = 'Shoes';

	function filterProductsByLabel(products: Product[], label: string): Product[] {
		return products.filter((product) => product.label === label).slice(0, productsPerCarousel);
	}

	function filterProductsByCategory(products: Product[], category: string): Product[] {
		return products
			.filter((product) => product.category === category)
			.slice(0, productsPerCarousel);
	}
</script>

<div>
	<Breadcrumbs {breadcrumbs} />
	{#await productsPromise}
		<SkeletonRecommendationsCarousel />
	{:then products}
		<div class="mb-8">
			<!-- Product Categories Tabs -->
			<div class="tabs-boxed tabs mb-4 flex w-full justify-between md:w-96" role="tablist">
				{#each productCategories as category (category)}
					<button
						class="tab flex-1 {activeTabProductCategory === category ? 'tab-active' : ''}"
						on:click={() => (activeTabProductCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>

			{#each productCategories as category (category)}
				{#if activeTabProductCategory === category && filterProductsByCategory(products, category.toLowerCase()).length}
					<div class="mb-4">
						<RecommendationsCarousel
							products={filterProductsByCategory(products, category.toLowerCase())}
							title={category}
						/>
					</div>
				{/if}
			{/each}
		</div>

		<div class="my-8">
			<!-- Main Categories Tabs -->
			<div class="tabs-boxed tabs mb-4 flex w-full justify-between md:w-96" role="tablist">
				{#each mainCategories as category (category)}
					<button
						class="tab flex-1 {activeTabMainCategory === category ? 'tab-active' : ''}"
						on:click={() => (activeTabMainCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>

			{#each mainCategories as category (category)}
				{#if activeTabMainCategory === category && filterProductsByLabel(products, category.toLowerCase()).length}
					<div class="mb-4">
						<RecommendationsCarousel
							products={filterProductsByLabel(products, category.toLowerCase())}
							title={category}
						/>
					</div>
				{/if}
			{/each}
		</div>
		<p>No products found</p>
	{:catch error}
		<!-- Error state -->
		<p class="text-red-500">Failed to load products: {error.message}</p>
	{/await}
</div>
