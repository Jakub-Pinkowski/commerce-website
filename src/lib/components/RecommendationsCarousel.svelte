<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';

	import type { Product } from '$lib/productTypes.ts';

	export let products: Product[];
	export let title: string = 'You may also like';
	const link = title.toLowerCase().replace(/\s+/g, '_');

	let recommendationsSwiper: Swiper;

	onMount(() => {
		recommendationsSwiper = new Swiper('.swiper.recommendations-carousel', {
			slidesPerView: 1.3,
			spaceBetween: 15,
			mousewheel: {
				forceToAxis: true
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
					navigation: {
						nextEl: '.swiper.recommendations-carousel .button-next',
						prevEl: '.swiper.recommendations-carousel  .button-prev',
						disabledClass: 'swiper-button-disabled'
					}
				}
			}
		});
	});
</script>

<div class="my-8">
	<div class="flex items-center justify-between border-b border-gray-200">
		<h3 class="mb-2 text-2xl font-bold">{title}</h3>
		{#if title !== 'You may also like'}
			<a href="/categories/{link}" class="btn btn-accent mb-2"> View all {title} </a>
		{/if}
	</div>
	<div class="swiper recommendations-carousel mt-4">
		<div class="swiper-wrapper">
			{#each products as product}
				<div class="swiper-slide">
					<a href={product.url} class="relative block w-full">
						{#if product.alternateImages.length > 0}
							<div class="group inset-0">
								<div class="relative h-full w-full">
									{#if product.price < product.listPrice}
										<div class="badge badge-lg absolute left-2 top-2 z-10 text-main-red">Sale</div>
									{:else if product.label && product.label.trim() !== ''}
										<div class="badge badge-lg absolute left-2 top-2 z-10 text-primary">
                                            {product.label}
										</div>
									{/if}
									<img
										src={product.imageUrl}
										alt={product.name}
										class=" inset-0 block h-auto w-full object-cover opacity-100 md:group-hover:opacity-0"
									/>
									<!-- FIXME: Jacket images have wrong ratio on hover-->
									<img
										src={product.alternateImages[0]}
										alt={`Alternate view of ${product.name}`}
										class="absolute inset-0 hidden h-auto w-full object-cover opacity-0 md:block md:group-hover:opacity-100"
									/>
								</div>
							</div>
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
					</div>
				</div>
			{/each}
			<!-- TODO: Adjust the arrows to be vertically in the middle of the image -->
		</div>
		<div class="hidden md:block">
			<div
				class="button-prev absolute left-8 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
			>
				<button class="btn btn-circle bg-white shadow-xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Outline"
						viewBox="0 0 24 24"
						width="36"
						height="36"
						><path
							d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"
						/></svg
					>
				</button>
			</div>
			<div
				class="button-next absolute right-8 top-1/3 z-10 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
			>
				<button class="btn btn-circle bg-white shadow-xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Outline"
						viewBox="0 0 24 24"
						width="36"
						height="36"
						><path
							d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Swiper */
	:global(.swiper-button-disabled) {
		opacity: 0.5;
	}

	:global(.swiper-button-disabled button) {
		cursor: not-allowed;
	}
</style>
