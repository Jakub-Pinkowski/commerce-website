<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let product = data?.product;
</script>

{#if product}
	<section class="flex">
		<!-- TODO: 2 sliders go here, one for thumbnails, one for main image -->
		<div class="w-3/5 max-w-[55%] flex-none">
			<img src={product.imageUrl} alt={product.name} class="w-full" />
		</div>
		<div class="w-2/5 max-w-[45%] flex-none p-8">
			<h1 class="text-xl font-bold">{product.name}</h1>
			<p class="mt-2">{product.description}</p>
			<p class="mt-4 font-semibold">{product.price}</p>
		</div>
	</section>
{:else}
	<h1 class="text-xl font-bold">No product found</h1>
{/if}
