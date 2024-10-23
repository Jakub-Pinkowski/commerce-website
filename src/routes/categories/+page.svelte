<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	import { filterProductsByLabel, filterProductsByCategory } from '$lib/helpers/fetching';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import SkeletonRecommendationsCarousel from '$lib/components/Common/SkeletonRecommendationsCarousel.svelte';
	import PageNotFound from '$lib/components/Common/PageNotFound.svelte';

	export let data: PageData;
	const products = data.products as Product[];

	const breadcrumbs = ['Home', 'Categories'];
	const productsPerCarousel = 8;
	const mainCategories = ['New', 'Sale', 'Best Sellers'];
	const mainCategoriesLabels = ['new', 'sale', 'best seller'];
	let activeTabMainCategory: string = 'New';
	const productCategories = ['Shoes', 'Backpacks', 'Caps', 'Bikes'];
	let activeTabProductCategory: string = 'Shoes';
</script>

<div>
	{#if products}
		<Breadcrumbs {breadcrumbs} />

		<div class="mb-8">
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

			{#each mainCategories as category, index (category)}
				{#if activeTabMainCategory === category && filterProductsByLabel(products, mainCategoriesLabels[index], productsPerCarousel).length}
					<div class="mb-4">
						<RecommendationsCarousel
							products={filterProductsByLabel(
								products,
								mainCategoriesLabels[index],
								productsPerCarousel
							)}
							title={category}
						/>
					</div>
				{/if}
			{/each}
		</div>

		<div class="my-8">
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
				{#if activeTabProductCategory === category && filterProductsByCategory(products, category.toLowerCase(), productsPerCarousel).length}
					<div class="mb-4">
						<RecommendationsCarousel
							products={filterProductsByCategory(
								products,
								category.toLowerCase(),
								productsPerCarousel
							)}
							title={category}
						/>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<PageNotFound />
	{/if}
</div>
