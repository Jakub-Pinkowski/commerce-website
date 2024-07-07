<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;

	let itemsPerPage = 8;
	let displayedProducts: Product[] = [];

	interface UpdateEventDetail {
		displayedProducts: Product[];
	}

	function handleUpdatePagination(event: CustomEvent<UpdateEventDetail>) {
		displayedProducts = event.detail.displayedProducts;
		scrollToTop();
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<div>
    <div class="breadcrumbs mb-6 text-sm">
        <ul>
            <li><a href="/">Home</a></li>
            <li>Products</li>
        </ul>
    </div>
	<h1 class="mb-4 text-3xl font-bold">All products</h1>
	{#if products}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each displayedProducts as product}
				<CategoryProductCard {product} />
			{/each}
		</div>
		<!-- TODO: Pass displayedProducts from Pagination to my main-->
		<Pagination {itemsPerPage} {displayedProducts} {products} on:update={handleUpdatePagination} />
		<!-- TODO: Later on we need to use some recommendedProducts instead -->
		<RecommendationsCarousel {products} />
	{:else}
		<p>No products found</p>
	{/if}
	<!-- TODO: Recommendation carousel goes here -->
</div>