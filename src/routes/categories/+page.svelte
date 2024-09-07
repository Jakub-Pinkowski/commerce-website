<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let productsPerCarousel = 8;
	let mainCategories = ['New', 'Sale', 'Best Sellers'];
	let activeTabMainCategory: string = 'New';
	let productCategories = ['Shoes', 'Backpacks', 'Caps', 'Bikes'];
	let activeTabProductCategory: string = 'Shoes';

    let breadcrumbs = ['Home', 'Categories'];

	// Main categories
	let newProducts = products
		.filter((product) => product.label === 'new')
		.slice(0, productsPerCarousel);
	let saleProducts = products
		.filter((product) => product.price < product.listPrice)
		.slice(0, productsPerCarousel);
	let bestSellerProducts = products
		.filter((product) => product.label === 'best seller')
		.slice(0, productsPerCarousel);

	// Product categories
	let shoesProducts = products
		.filter((product) => product.category === 'shoes')
		.slice(0, productsPerCarousel);
	let backpackProducts = products
		.filter((product) => product.category === 'backpacks')
		.slice(0, productsPerCarousel);
	let capsProducts = products
		.filter((product) => product.category === 'caps')
		.slice(0, productsPerCarousel);
	let bikesProducts = products
		.filter((product) => product.category === 'bikes')
		.slice(0, productsPerCarousel);
</script>

<div>
    <Breadcrumbs {breadcrumbs} />
	{#if products}
		<div class="mb-8">
			<!-- TODO: Animate the buttons -->
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

			{#if activeTabProductCategory === 'Shoes' && shoesProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={shoesProducts} title="Shoes" />
				</div>
			{/if}

			{#if activeTabProductCategory === 'Backpacks' && backpackProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={backpackProducts} title="Backpacks" />
				</div>
			{/if}

			{#if activeTabProductCategory === 'Caps' && capsProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={capsProducts} title="Caps" />
				</div>
			{/if}

			{#if activeTabProductCategory === 'Bikes' && bikesProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={bikesProducts} title="Bikes" />
				</div>
			{/if}
		</div>
		<div class="my-8">
			<!-- TODO: Animate the buttons -->
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

			<!-- TODO: Possibly animate those as well, using svelte transitions -->
			{#if activeTabMainCategory === 'New' && newProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={newProducts} title="New" />
				</div>
			{/if}

			{#if activeTabMainCategory === 'Sale' && newProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={saleProducts} title="Sale" />
				</div>
			{/if}

			{#if activeTabMainCategory === 'Best Sellers' && products.length}
				<div class="mb-4">
					<RecommendationsCarousel products={bestSellerProducts} title="Best Sellers" />
				</div>
			{/if}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
