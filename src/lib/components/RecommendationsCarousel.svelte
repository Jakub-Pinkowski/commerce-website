<script lang="ts">
	import type { Product } from '$lib/productTypes.ts';
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';

	export let products: Product[];

	let recommendationsSwiper: Swiper;

	onMount(() => {
		recommendationsSwiper = new Swiper('.swiper.recommendations-carousel', {
			slidesPerView: 1.4,
			spaceBetween: 15,
			mousewheel: {
				forceToAxis: true
			},
			navigation: {
				nextEl: '.swiper.recommendations-carousel .button-next',
				prevEl: '.swiper.recommendations-carousel  .button-prev',
				disabledClass: 'swiper-button-disabled'
			},
			breakpoints: {
				768: {
					slidesPerView: 4
				}
			}
		});
	});
</script>

<!-- TODO: Add Hover -->
<!-- TODO: Make styling similar to category pages -->
<div class="my-8">
	<h3 class="mt-8 border-b border-gray-200 pb-2 text-2xl font-bold">Similar products</h3>
	<div class="swiper recommendations-carousel mt-4">
		<div class="swiper-wrapper">
			{#each products as product}
				<div class="swiper-slide">
					<a href={product.url}>
						<img
							src={product.imageUrl}
							alt={product.name}
							class="h-full object-cover"
							loading="lazy"
						/>
					</a>
					<div class="pt-2">
						<a href={product.url}>
							<h3 class="text-lg">Product name</h3>
						</a>
						<span class="block text-sm">Product brand</span>
						<span class="block pt-2 text-lg text-gray-500">$99</span>
					</div>
				</div>
			{/each}
			<!-- TODO: Adjust the arrows to be vertically in the middle of the image -->
		</div>
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
