<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let productsPerPage = 8;
	let mainCategories = ['New', 'Sale', 'Best Sellers'];
	let activeTabMainCategory: string = 'New';
	let productCategories = ['Shoes', 'Jackets', 'Pants'];
	let activeTabProductCategory: string = 'Shoes';

	let newProducts = products.filter((product) => product.label === 'new').slice(0, productsPerPage);
	let saleProducts = products
		.filter((product) => product.price < product.listPrice)
		.slice(0, productsPerPage);
	// TODO: Introduce real bestSellers later
	let bestSellerProducts = products.slice(0, productsPerPage);

	let shoesProducts = products
		.filter((product) => product.category === 'shoes')
		.slice(0, productsPerPage);
	let jacketsProducts = products
		.filter((product) => product.category === 'jackets')
		.slice(0, productsPerPage);
	let pantsProducts = products
		.filter((product) => product.category === 'pants')
		.slice(0, productsPerPage);
</script>

<div>
	<div class="breadcrumbs mb-6 text-sm">
		<ul>
			<li><a href="/">Home</a></li>
			<li>Categories</li>
		</ul>
	</div>
	{#if products}
		<div class="mb-8">
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
					<!-- <div class="flex justify-center">
						<a href="/categories/shoes" class="btn btn-accent"> View all shoes </a>
					</div> -->
				</div>
			{/if}

			{#if activeTabProductCategory === 'Jackets' && jacketsProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={jacketsProducts} title="Jackets" />
				</div>
			{/if}

			{#if activeTabProductCategory === 'Pants' && pantsProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={pantsProducts} title="Pants" />
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
					<div class="flex justify-center">
						<a href="/categories/new" class="btn btn-accent"> View all new products </a>
					</div>
				</div>
			{/if}

			{#if activeTabMainCategory === 'Sale' && newProducts.length}
				<div class="mb-4">
					<RecommendationsCarousel products={saleProducts} title="Sale" />
					<div class="flex justify-center">
						<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
					</div>
				</div>
			{/if}

			{#if activeTabMainCategory === 'Best Sellers' && products.length}
				<div class="mb-4">
					<RecommendationsCarousel products={bestSellerProducts} title="Best Sellers" />
					<div class="flex justify-center">
						<a href="/categories/best-sellers" class="btn btn-accent"> View all best sellers </a>
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
