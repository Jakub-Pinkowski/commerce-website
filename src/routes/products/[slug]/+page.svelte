<script lang="ts">
	import type { PageData } from './$types';

	import GallerySwiper from './GallerySwiper.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let product = data?.product;
</script>

{#if product}
<div class="breadcrumbs mb-6 text-xs">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li>{product.name}</li>
    </ul>
</div>
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
