<script lang="ts">
	import type { PageData } from './$types';
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';

	import GallerySwiper from './GallerySwiper.svelte';
	import ProductDetails from './ProductDetails.svelte';

	export let data: PageData;
	export let product = data?.product;
	let mainSwiper: Swiper;
	let thumbSwiper: Swiper;
	let smallInfoSwiper: Swiper;
	let recommendationsSwiper: Swiper;

	onMount(() => {
		thumbSwiper = new Swiper('.swiper.thumb-image', {
			direction: 'vertical',
			slidesPerView: 7,
			spaceBetween: 10,
			slideToClickedSlide: true,
			watchSlidesProgress: true
		});

		mainSwiper = new Swiper('.swiper.main-image', {
			slidesPerView: 1,
			loop: true,
			thumbs: {
				swiper: thumbSwiper
			},
			navigation: {
				nextEl: '.swiper.main-image .button-next',
				prevEl: '.swiper.main-image .button-prev',
				disabledClass: 'swiper-button-disabled'
			}
		});

		// TODO: Make it possible to swipe with a touchpad
		smallInfoSwiper = new Swiper('.swiper.info-carousel', {
			slidesPerView: 2.4,
			spaceBetween: 15,
			mousewheel: {
				forceToAxis: true
			},
			scrollbar: {
				el: '.swiper.info-carousel .swiper-scrollbar'
			}
		});

		recommendationsSwiper = new Swiper('.swiper.recommendations-carousel', {
			slidesPerView: 4,
			spaceBetween: 15,
			mousewheel: {
				forceToAxis: true
			},
			navigation: {
				nextEl: '.swiper.recommendations-carousel .button-next',
				prevEl: '.swiper.recommendations-carousel  .button-prev',
				disabledClass: 'swiper-button-disabled'
			}
		});
	});
</script>

{#if product}
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
	<div>
		<h3 class="mt-8 border-b border-gray-200 pb-2 text-2xl font-bold">Similar products</h3>
		<div class="swiper recommendations-carousel mt-4">
			<div class="swiper-wrapper">
				<!-- NOTE: Those are kinda my other items now -->
				{#each product.alternateImages as alternateImage}
					<div class="swiper-slide">
						<a href={product.url}>
							<img
								src={alternateImage}
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
				{#each product.alternateImages as alternateImage}
					<div class="swiper-slide">
						<a href={product.url}>
							<img
								src={alternateImage}
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
			</div>
			<div
				class="button-prev absolute left-8 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
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
				class="button-next absolute right-8 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
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
{:else}
	<!-- TODO: Design this 404 part -->
	<h1 class="text-xl font-bold">No product found</h1>
{/if}

<style>
	/* Swiper */
	:global(.swiper.thumb-image .swiper-slide) {
		opacity: 0.4;
	}
	:global(.swiper.thumb-image .swiper-slide-thumb-active) {
		opacity: 1;
	}

    :global(.swiper-button-disabled) {
        opacity: 0.5;
    }

    :global(.swiper-button-disabled button) {
        cursor: not-allowed;
    }
</style>
