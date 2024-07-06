<script lang="ts">
	import type { PageData } from './$types';

	import GallerySwiper from './GallerySwiper.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let product = data?.product;
</script>

{#if product}
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
    <!-- FIXME: Products vs Product issue -->
	<!-- <RecommendationsCarousel {products} /> -->
{:else}
	<!-- TODO: Design this 404 part -->
	<h1 class="text-xl font-bold">No product found</h1>
{/if}

<style>
	/* Swiper */



</style>
