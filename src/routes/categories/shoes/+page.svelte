<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import { debounce } from '$lib/helpers/functions';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;

	let itemsPerPage = 24;
	let displayedProducts: Product[] = [];

	let minPrice: number | null = null;
	let maxPrice: number | null = null;
	let selectedColors: Set<string> = new Set();
	let sortOption: string | null = null;

	let possibleColors = [
		...new Set(
			products
				.flatMap((product) => product.colors)
				.filter((color) => color !== undefined)
				.map((color) => color.charAt(0).toUpperCase() + color.slice(1))
		)
	].sort();
	// TODO: Add new categories later on

	interface UpdateEventDetail {
		displayedProducts: Product[];
	}

	function handleUpdatePagination(event: CustomEvent<UpdateEventDetail>) {
		displayedProducts = event.detail.displayedProducts;
	}

	function sortProducts(products: Product[]): Product[] {
		if (!sortOption) return products;

		return products.slice().sort((a, b) => {
			switch (sortOption) {
				case 'Price: low to high':
					return a.price - b.price;
				case 'Price: high to low':
					return b.price - a.price;
				default:
					return 0;
			}
		});
	}

	function filterProducts() {
		let filteredProducts = products.filter((product) => {
			const matchesPrice =
				(!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
			if (product.colors) {
				const matchesColor =
					selectedColors.size === 0 || product.colors.some((color) => selectedColors.has(color));
				return matchesPrice && matchesColor;
			}

			return matchesPrice;
		});

		displayedProducts = sortProducts(filteredProducts);
	}

	const debouncedFilterProducts = debounce(filterProducts, 200);

	function toggleColor(color: string) {
		if (selectedColors.has(color)) {
			selectedColors.delete(color);
		} else {
			selectedColors.add(color);
		}
		filterProducts();
	}

	$: [products, minPrice, maxPrice, selectedColors], debouncedFilterProducts();
</script>

<div>
	<div class="breadcrumbs mb-6 text-xs">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/categories">Categories</a></li>
			<li>Shoes</li>
		</ul>
	</div>

	<div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-6">
		<h1 class="text-3xl font-bold">Shoes</h1>
		<!-- TODO: Make sorting actually work -->
		<div class="dropdown dropdown-end">
			<div
				tabindex="0"
				role="button"
				class="group inline-flex justify-center text-gray-700 hover:text-gray-900"
			>
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
			<!-- TODO: Make it dynamic later, define all sorting options in a separate component -->
			<ul tabindex="0" class="menu dropdown-content z-20 w-44 rounded-box bg-base-100 p-2 shadow">
				<li>
					<button
						on:click={() => {
							sortOption = 'Price: low to high';
							filterProducts();
						}}>Price: low to high</button
					>
				</li>
				<li>
					<button
						on:click={() => {
							sortOption = 'Price: high to low';
							filterProducts();
						}}>Price: high to low</button
					>
				</li>
			</ul>
		</div>
	</div>

	{#if displayedProducts}
		<div class="flex">
			<!-- Desktop Sidebar -->
			<div class="hidden w-64 min-w-64 max-w-64 flex-col pr-4 lg:flex">
				<div class="join join-vertical w-full">
					<div class="collapse join-item collapse-plus border-b border-base-300">
						<input type="checkbox" name="my-accordion-43" />
						<div class="collapse-title pl-1 text-lg font-medium">Price</div>
						<div class="collapse-content pl-1">
							<div class="flex gap-2">
								<input
									type="text"
									placeholder="Min"
									class="input input-bordered w-full text-sm"
									bind:value={minPrice}
								/>
								<input
									type="text"
									placeholder="Max"
									class="input input-bordered w-full text-sm"
									bind:value={maxPrice}
								/>
							</div>
						</div>
					</div>
					<div class="collapse join-item collapse-plus border-b border-base-300">
						<input type="checkbox" name="my-accordion-4" />
						<div class="collapse-title pl-1 text-lg font-medium">Color</div>
						<div class="collapse-content pl-1">
							<div class="flex flex-col gap-2">
								{#each Array.from(possibleColors) as color}
									<div class="flex items-center">
										<input
											type="checkbox"
											id={color}
											checked={selectedColors.has(color)}
											value={color}
											on:change={() => toggleColor(color.toLowerCase())}
											class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
										/>
										<label for={color} class="ml-3 text-sm text-gray-600">{color}</label>
									</div>
								{/each}
							</div>
						</div>
					</div>
                    <!-- TODO: Add some more facets later on -->
				</div>
			</div>

			<!-- Mobile Sidebar -->
			<div class="lg:hidden"></div>

			<!-- Products -->
			<div class="w-full">
				<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
					{#each displayedProducts as product}
						<CategoryProductCard {product} />
					{/each}
				</div>

				<!-- TODO: Design a new Pagination compatible with Svelte 5 later on -->
				{#if displayedProducts.length > itemsPerPage}
					<Pagination
						{itemsPerPage}
						{displayedProducts}
						{products}
						on:update={handleUpdatePagination}
					/>
				{/if}
			</div>
		</div>

		<!-- TODO: Pass displayedProducts from Pagination to my main-->

		<!-- TODO: Later on we need to use some recommendedProducts instead -->
		<!-- <RecommendationsCarousel {products} /> -->
	{:else}
		<p>No products found</p>
	{/if}
</div>

<style scoped>
	[type='checkbox']:focus {
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
