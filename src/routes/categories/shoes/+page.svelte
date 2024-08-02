<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;

	// TODO: Later on change to probably around 24 on desktop and 16 on mobile
	let itemsPerPage = 8;
	let displayedProducts: Product[] = [];

	interface UpdateEventDetail {
		displayedProducts: Product[];
	}

	function handleUpdatePagination(event: CustomEvent<UpdateEventDetail>) {
		displayedProducts = event.detail.displayedProducts;
	}
</script>

<div>
	<div class="breadcrumbs mb-6 text-xs">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/categories">Categories</a></li>
			<li>Shoes</li>
		</ul>
	</div>

	<h1 class="mb-4 border-b border-gray-200 pb-6 text-3xl font-bold">Shoes</h1>
	{#if products}
		<div class="flex">
			<!-- Top Toolbar -->

			<!-- Sidebar -->
			<div class="flex w-64 min-w-64 max-w-64 flex-col pr-4">
				<div class="join join-vertical w-full">
					<div class="collapse join-item collapse-plus border border-base-300">
						<input type="checkbox" name="my-accordion-43" />
						<div class="collapse-title text-xl font-medium">Price</div>
						<div class="collapse-content">
							<div class="flex flex-col gap-2">
								<div class="flex items-center">
									<input
										type="checkbox"
										id="random-for-now"
										checked={false}
										class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
									/>
									<label for="random-for-now" class="ml-3 text-sm text-gray-600">Blue</label>
								</div>
								<div class="flex items-center">
									<input
										type="checkbox"
										id="random-for-now"
										checked={false}
										class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
									/>
									<label for="random-for-now" class="ml-3 text-sm text-gray-600">Green</label>
								</div>
								<div class="flex items-center">
									<input
										type="checkbox"
										id="random-for-now"
										checked={false}
										class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
									/>
									<label for="random-for-now" class="ml-3 text-sm text-gray-600">Yellow</label>
								</div>
								<div class="flex items-center">
									<input
										type="checkbox"
										id="random-for-now"
										checked={false}
										class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
									/>
									<label for="random-for-now" class="ml-3 text-sm text-gray-600">Red</label>
								</div>
							</div>
						</div>
					</div>
					<div class="collapse join-item collapse-plus border border-base-300">
						<input type="checkbox" name="my-accordion-4" />
						<div class="collapse-title text-xl font-medium">Size</div>
						<div class="collapse-content">
							<input type="checkbox" checked={true} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
						</div>
					</div>
					<div class="collapse join-item collapse-plus border border-base-300">
						<input type="checkbox" name="my-accordion-4" />
						<div class="collapse-title text-xl font-medium">Color</div>
						<div class="collapse-content">
							<input type="checkbox" checked={true} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
							<input type="checkbox" checked={false} class="checkbox-primary checkbox" />
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each displayedProducts as product}
					<CategoryProductCard {product} />
				{/each}
			</div>
		</div>

		<!-- TODO: Pass displayedProducts from Pagination to my main-->
		<Pagination {itemsPerPage} {displayedProducts} {products} on:update={handleUpdatePagination} />
		<!-- TODO: Later on we need to use some recommendedProducts instead -->
		<!-- <RecommendationsCarousel {products} /> -->
	{:else}
		<p>No products found</p>
	{/if}
	<!-- TODO: Recommendation carousel goes here -->
</div>

<style scoped>
	[type='checkbox']:focus,
	[type='radio']:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		--tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
		--tw-ring-offset-width: 2px;
		--tw-ring-offset-color: #fff;
		--tw-ring-color: #3f594b;
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
	}
</style>
