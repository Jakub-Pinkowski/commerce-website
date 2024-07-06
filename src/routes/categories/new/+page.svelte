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
				<div class="mb-8">
					<a href={product.url} class="relative block w-full md:pb-[100%]">
						{#if product.alternateImages.length > 0}
							<div class="group absolute inset-0 hidden md:block">
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
                            <img src={product.imageUrl} alt={product.name} class="block md:hidden" />
						{:else}
							<img src={product.imageUrl} alt={product.name} />
						{/if}
					</a>
					<div class="pt-2">
						<a href={product.url}>
							<h3 class="line-clamp-1">{product.name}</h3>
						</a>
						<span class="line-clamp-1 block text-sm">{product.brand}</span>
						<div class="mt-4">
							{#if product.price < product.listPrice}
								<span class="mr-1 inline-block text-lg text-gray-500 line-through">
									${product.listPrice}
								</span>
								<span class="inline-block text-lg text-main-red">${product.price}</span>
							{:else}
								<span class="inline-block text-lg text-gray-500">${product.price}</span>
							{/if}
						</div>
						<div class="mt-4 flex w-full justify-between md:hidden">
							<button class="btn btn-primary flex text-white px-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									id="Outline"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<path
										d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"
										fill="#ffffff"
									/>
									<circle cx="7" cy="22" r="2" fill="#ffffff" />
									<circle cx="17" cy="22" r="2" fill="#ffffff" />
								</svg>
							</button>
							<button class="btn px-6">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
									<g id="_01_align_center" data-name="01 align center">
										<path
											d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
										/>
									</g>
								</svg>
							</button>
						</div>
						<div class="mt-4 hidden w-full grid-cols-[1fr,auto] gap-x-4 md:grid">
							<button class="btn btn-primary text-white"> Add to cart </button>
							<button class="btn">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
									<g id="_01_align_center" data-name="01 align center">
										<path
											d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
										/>
									</g>
								</svg>
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>No products found</p>
	{/if}
</div>
