<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'New');
	let saleProducts = products.filter((product) => product.price < product.listPrice);
</script>

<div>
	<h1 class="mb-4 text-3xl font-bold">Categories</h1>
	{#if newProducts}
		<div class="mb-2 mt-10">
			<h2 class="mb-4 text-2xl font-bold">New</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each newProducts.slice(0, 4) as product}
					<CategoryProductCard {product} />
				{/each}
			</div>
		</div>
		<div class="my-2 flex justify-center">
			<a href="/categories/new" class="btn btn-accent"> View all new products </a>
		</div>
	{/if}
	{#if saleProducts}
		<div class="mb-2 mt-10">
			<h2 class="mb-4 text-2xl font-bold">Sale</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each saleProducts.slice(0, 4) as product}
					<CategoryProductCard {product} />
				{/each}
			</div>
		</div>
		<div class="my-2 flex justify-center">
			<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
		</div>
	{/if}
    {#if products}
    <div class="mb-2 mt-10">
        <h2 class="mb-4 text-2xl font-bold">All products</h2>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            {#each products.slice(0, 4) as product}
                <CategoryProductCard {product} />
            {/each}
        </div>
    </div>
    <div class="my-2 flex justify-center">
        <a href="/products" class="btn btn-accent"> View all products </a>
    </div>
{/if}
</div>
