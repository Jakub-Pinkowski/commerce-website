<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'New');
	let saleProducts = products.filter((product) => product.price < product.listPrice);

	let activeTab: string = 'New';
</script>

<div>
	<div class="tabs-boxed tabs mb-4 flex w-96 justify-between" role="tablist">
		<button
			class="tab flex-1 {activeTab === 'New' ? 'tab-active' : ''}"
			on:click={() => (activeTab = 'New')}>New</button
		>
		<button
			class="tab flex-1 {activeTab === 'Sale' ? 'tab-active' : ''}"
			on:click={() => (activeTab = 'Sale')}>Sale</button
		>
		<button
			class="tab flex-1 {activeTab === 'All' ? 'tab-active' : ''}"
			on:click={() => (activeTab = 'All')}>Shop All</button
		>
	</div>

	{#if activeTab === 'New' && newProducts.length}
		<RecommendationsCarousel products={newProducts} title="New" />
		<div class="flex justify-center">
			<a href="/categories/new" class="btn btn-primary"> View all new products </a>
		</div>
	{/if}

	{#if activeTab === 'Sale' && saleProducts.length}
		<RecommendationsCarousel products={saleProducts} title="Sale" />
		<div class="flex justify-center">
			<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
		</div>
	{/if}

	{#if activeTab === 'All' && products.length}
		<RecommendationsCarousel {products} title="All products" />
		<div class="flex justify-center">
			<a href="/products/" class="btn btn-accent"> View all products </a>
		</div>
	{/if}
</div>
