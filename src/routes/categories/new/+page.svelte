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
				<div class="w-full">
					<a href={product.url} class="relative block w-full pb-[100%]">
						{#if product.alternateImages.length > 0}
							<div class="group absolute inset-0">
								<div class="relative h-full w-full">
									<img
										src={product.imageUrl}
										alt={product.name}
										class="absolute inset-0 block h-auto w-full object-cover opacity-100 group-hover:opacity-0"
									/>

									<!-- NOTE: Jacket images have wrong ratio on hover, ignore for now -->
									<img
										src={product.alternateImages[0]}
										alt={`Alternate view of ${product.name}`}
										class="absolute inset-0 block h-auto w-full object-cover opacity-0 group-hover:opacity-100"
									/>
								</div>
							</div>
						{:else}
							<img src={product.imageUrl} alt={product.name} />
						{/if}
					</a>
					<div class="pt-2">
						<a href={product.url}>
							<h3 class="text-lg">{product.name}</h3>
						</a>
						<span class="block text-sm">{product.brand}</span>
						<div class="mt-8">
							{#if product.price < product.listPrice}
								<span class="mr-2 inline-block text-xl text-gray-500 line-through">
									${product.listPrice}
								</span>
								<span class="inline-block text-xl text-main-red">${product.price}</span>
							{:else}
								<span class="inline-block text-xl text-gray-500">${product.price}</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
