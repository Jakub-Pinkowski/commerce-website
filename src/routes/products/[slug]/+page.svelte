<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let product = data?.product;
</script>

{#if product}
	<section class="flex flex-col md:flex-row">
		<!-- TODO: 2 sliders go here, one for thumbnails, one for main image -->
		<div class="w-full flex-none md:max-w-[55%]">
			<img src={product.imageUrl} alt={product.name} class="w-full" />
		</div>
		<div class="w-full flex-none p-8 md:max-w-[45%]">
			<h1 class="text-3xl font-bold">{product.name}</h1>
			<p class="my-8 text-xl">{product.description}</p>
			{#if product.price < product.listPrice}
				<span class="mt-4 text-2xl text-gray-500 line-through">${product.listPrice}</span>
				<span class="text-2xl text-red-600">${product.price}</span>
			{:else}
				<span class="mt-4 text-2xl text-gray-500">${product.price}</span>
			{/if}
			<button class="btn btn-primary btn-block mt-8 text-lg"> Add to cart </button>
			<button class="btn btn-neutral btn-block mt-8 text-lg"> Add to wishlist </button>
		</div>
	</section>
{:else}
	<h1 class="text-xl font-bold">No product found</h1>
{/if}
