<script lang="ts">
	import type { PageData } from './$types';
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';

	import GallerySwiper from './GallerySwiper.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import RecommendationsCarousel from './RecommendationsCarousel.svelte';

	export let data: PageData;
	export let product = data?.product;
	let mainSwiper: Swiper;
	let thumbSwiper: Swiper;
	let smallInfoSwiper: Swiper;
	let recommendationsSwiper: Swiper;

	onMount(() => {
		thumbSwiper = new Swiper('.swiper.thumb-image', {
			slidesPerView: 4.4,
			spaceBetween: 10,
			slideToClickedSlide: true,
			watchSlidesProgress: true,
			breakpoints: {
				768: {
					direction: 'vertical',
					slidesPerView: 7
				}
			}
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
			slidesPerView: 2,
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

{#if product}
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
	<RecommendationsCarousel {product} />
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
