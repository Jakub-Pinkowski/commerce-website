<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';

	import desert from '$lib/assets/images/desert.jpg';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	import GallerySwiper from './GallerySwiper.svelte';
	import ProductDetails from './ProductDetails.svelte';

	export let data: PageData;
	const product = data?.product as Product;

	let breadcrumbs = ['Home', 'Products', product?.name ?? ''];
</script>

{#if product}
	<Breadcrumbs {breadcrumbs} />
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
	<!-- FIXME: Products vs Product issue -->
	<!-- <RecommendationsCarousel {products} /> -->
{:else}
	<section
		class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
		style="background-image: url({desert});"
	>
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-2xl">
				<h1 class="mb-8 text-5xl">Error 404: Not Found</h1>
				<p class="mb-8 text-4xl">Looks like this page doesn't exist</p>
				<a href="/" class="btn btn-accent">Homepage</a>
			</div>
		</div>
	</section>
{/if}

<style>
	/* Swiper */
</style>
