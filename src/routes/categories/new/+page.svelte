<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	export let products = data?.products;
</script>

<div>
	<h1 class="mb-4 text-3xl font-bold">New</h1>
	{#if products}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each products as product}
				<div>
					<a href={product.url}>
						<img src={product.imageUrl} alt={product.name} />
					</a>
					<div class="pt-2">
						<a href={product.url}>
							<h3 class="text-lg">{product.name}</h3>
						</a>
						<span class="block text-sm">{product.brand}</span>
						{#if product.price < product.listPrice}
							<div class="mt-8">
								<span class="mr-2 inline-block text-xl text-gray-500 line-through">
									${product.listPrice}
								</span>
								<span class="inline-block text-xl text-main-red">${product.price}</span>
							</div>
						{:else}
							<div class="mt-8">
								<span class="inline-block text-xl text-gray-500">${product.price}</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
