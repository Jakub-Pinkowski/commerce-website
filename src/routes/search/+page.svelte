<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;

	let searchQuery = '';
	let breadcrumbs = ['Home', 'Search'];

	$: filteredProducts = searchQuery
		? products?.filter(
				(product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.colors.some((color) => color.toLowerCase().includes(searchQuery.toLowerCase()))
			)
		: [];
</script>

<Breadcrumbs {breadcrumbs} />
<h1 class="mb-4 text-3xl font-bold">Search</h1>
<label class="input input-bordered mb-16 flex max-w-xs items-center gap-2">
	<input type="text" class="grow" placeholder="Enter your search here" bind:value={searchQuery} />
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		class="h-4 w-4 opacity-70"
	>
		<path
			fill-rule="evenodd"
			d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
			clip-rule="evenodd"
		/>
	</svg>
</label>
<!-- TODO: Add filters to search and categories -->

{#if !searchQuery}
	<!-- TODO: Style it -->
{:else if filteredProducts && filteredProducts.length > 0}
	<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
		{#each filteredProducts as product}
			<CategoryProductCard {product} />
		{/each}
	</div>
{:else}
	<div class="mb-12">
		No products found matching your query
		<span class="font-bold">'{searchQuery}'</span>
	</div>
	<!-- TODO: Insert best sellers or sales or whatever else, some real data -->
	<RecommendationsCarousel {products} />
{/if}
