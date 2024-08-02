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

	<div class="mb-4 flex justify-between border-b border-gray-200">
		<h1 class="  pb-6 text-3xl font-bold">Shoes</h1>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
				Sort
                <svg
					class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
				<li>Most popular</li>
				<li>Best seller</li>
				<li>Price: Low to high</li>
				<li>Price: High to low</li>
			</ul>
		</div>
	</div>

	{#if products}
		<div class="flex">
			<!-- Sidebar -->
			<div class="flex w-64 min-w-64 max-w-64 flex-col pr-4">
				<div class="join join-vertical w-full">
					<div class="collapse join-item collapse-plus border-b border-base-300">
						<input type="checkbox" name="my-accordion-43" />
						<div class="collapse-title pl-1 text-lg font-medium">Price</div>
						<div class="collapse-content pl-1">
							<div class="flex gap-2">
								<input type="text" placeholder="Min" class="input input-bordered w-full text-sm" />
								<input type="text" placeholder="Max" class="input input-bordered w-full text-sm" />
							</div>
						</div>
					</div>
					<div class="collapse join-item collapse-plus border-b border-base-300">
						<input type="checkbox" name="my-accordion-4" />
						<div class="collapse-title pl-1 text-lg font-medium">Color</div>
						<div class="collapse-content pl-1">
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
					<div class="collapse join-item collapse-plus !rounded-none border-b border-base-300">
						<input type="checkbox" name="my-accordion-4" />
						<div class="collapse-title pl-1 text-lg font-medium">Size</div>
						<div class="collapse-content pl-1">
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
				</div>
			</div>

			<!-- Products -->
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
