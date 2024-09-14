<script lang="ts">
	import type { Product } from '$lib/types/productTypes';
	import { debounce } from '$lib/helpers/utils';
	import {
		filterProducts,
		getPossibleColors,
		toggleColor,
		getPossibleBrands,
		toggleBrand,
		getPossibleCategories,
		toggleCategory
	} from '$lib/helpers/filtering';
	import CategoryProductCard from '$lib/components/CategoryPages/CategoryProductCard.svelte';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import FilterSection from '$lib/components/CategoryPages/FilterSection.svelte';
	import Pagination from '$lib/components/Common/Pagination.svelte';
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
    import SkeletonCategoryPage from './SkeletonCategoryPage.svelte';

	export let title: string;
	export let products: Product[];
	export let breadcrumbs: string[];

	// Pagination
	let itemsPerPage = 24;
	let displayedProducts: Product[] = [];

	interface UpdateEventDetail {
		displayedProducts: Product[];
	}
	function handleUpdatePagination(event: CustomEvent<UpdateEventDetail>) {
		displayedProducts = event.detail.displayedProducts;
	}

	// Filtering and Sorting
    // TODO: Refactor, fix and optimize the whole filtering logic
	const initialMinPrice: number = Math.min(...products.map((product) => product.price));
	const initialMaxPrice: number = Math.max(...products.map((product) => product.price));
	let minPrice: number = initialMinPrice;
	let maxPrice: number = initialMaxPrice;
	let tempMinPrice: number = initialMinPrice;
	let tempMaxPrice: number = initialMaxPrice;
	let sortOption: string | null = null;
	// TODO: Count of colors should be updated based on the selected filters
	let possibleColors = getPossibleColors(products);
	let selectedColors: Set<string> = new Set();
	let possibleBrands = getPossibleBrands(products);
	let selectedBrands: Set<string> = new Set();
	let possibleCategories = getPossibleCategories(products);
	let selectedCategories: Set<string> = new Set();

	// TODO: Show active filters section
	function updatePriceRange(filteredProducts: Product[]) {
		if (filteredProducts.length > 0) {
			minPrice = Math.min(...filteredProducts.map((product) => product.price));
			maxPrice = Math.max(...filteredProducts.map((product) => product.price));
		} else {
			minPrice = initialMinPrice;
			maxPrice = initialMaxPrice;
		}
	}

	function resetPriceRangeIfNeeded() {
		if (selectedColors.size === 0 && selectedBrands.size === 0 && selectedCategories.size === 0) {
			minPrice = initialMinPrice;
			maxPrice = initialMaxPrice;
		}
	}

	function updateDisplayedProducts() {
		const filteredProducts = filterProducts(
			products,
			minPrice,
			maxPrice,
			sortOption,
			selectedColors,
			selectedBrands,
			selectedCategories
		);
		updatePriceRange(filteredProducts);
		displayedProducts = filteredProducts;
	}

	const debouncedUpdateDisplayedProducts = debounce(updateDisplayedProducts, 200);

	function handleToggle(
		set: Set<string>,
		toggleFunction: (set: Set<string>, item: string) => Set<string>,
		item: string
	) {
		set = new Set(toggleFunction(set, item));
		resetPriceRangeIfNeeded();
		updateDisplayedProducts();
	}

	function handleToggleColor(color: string) {
		handleToggle(selectedColors, toggleColor, color);
	}

	function handleToggleBrand(brand: string) {
		handleToggle(selectedBrands, toggleBrand, brand);
	}

	function handleToggleCategory(category: string) {
		handleToggle(selectedCategories, toggleCategory, category);
	}

	function handlePriceInputBlur() {
		minPrice = tempMinPrice;
		maxPrice = tempMaxPrice;
		updateDisplayedProducts();
	}

	function handlePriceInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handlePriceInputBlur();
		}
	}

	$: [products, minPrice, maxPrice, sortOption, selectedColors, selectedBrands, selectedCategories],
		debouncedUpdateDisplayedProducts();
</script>

<div>
	<Breadcrumbs {breadcrumbs} />

	<div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-6">
		<h1 class="text-3xl font-bold">{title}</h1>
		<!-- TODO: Export sorting -->
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
							updateDisplayedProducts();
						}}>Price: low to high</button
					>
				</li>
				<li>
					<button
						on:click={() => {
							sortOption = 'Price: high to low';
							updateDisplayedProducts();
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
					<!-- TODO: Export range filter -->
					<span class="badge indicator-item badge-accent">Filtering is a bit buggy!</span>
					<div class="collapse join-item collapse-plus !rounded-none border-b border-base-300">
						<input type="checkbox" name="my-accordion-43" />
						<div class="collapse-title pl-1 text-lg font-medium">Price</div>
						<div class="collapse-content pl-1">
							<div class="flex gap-2">
								<input
									type="text"
									placeholder={minPrice ? '' : 'Min'}
									class="input input-bordered w-full text-sm"
									bind:value={tempMinPrice}
									on:blur={handlePriceInputBlur}
									on:keydown={handlePriceInputKeydown}
								/>
								<input
									type="text"
									placeholder={maxPrice ? '' : 'Max'}
									class="input input-bordered w-full text-sm"
									bind:value={tempMaxPrice}
									on:blur={handlePriceInputBlur}
									on:keydown={handlePriceInputKeydown}
								/>
							</div>
						</div>
					</div>
					<FilterSection title="Color" filters={possibleColors} handleToggle={handleToggleColor} />
					<FilterSection title="Brand" filters={possibleBrands} handleToggle={handleToggleBrand} />
					<FilterSection
						title="Category"
						filters={possibleCategories}
						handleToggle={handleToggleCategory}
					/>
					<!-- TODO: Add some more facets -->
				</div>
			</div>

			<!-- TODO: Design and build Mobile Sidebar -->
			<!-- Mobile Sidebar -->
			<div class="lg:hidden"></div>

			<!-- Products -->
            <SkeletonCategoryPage />
			<!-- <div class="w-full">
				<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
					{#each displayedProducts as product}
						<CategoryProductCard {product} />
					{/each}
				</div> -->

				<!-- TODO: Design a new Pagination compatible with Svelte 5 -->
				<!-- {#if displayedProducts.length > itemsPerPage}
					<Pagination
						{itemsPerPage}
						{displayedProducts}
						{products}
						on:update={handleUpdatePagination}
					/>
				{/if}
			</div> -->
		</div>

		<!-- TODO: Later on we need to use some recommendedProducts instead -->
		<!-- <RecommendationsCarousel {products} /> -->
	{:else}
		<!-- TODO: Style this part -->
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
		--tw-ring-shadow: var (--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
	}
</style>
