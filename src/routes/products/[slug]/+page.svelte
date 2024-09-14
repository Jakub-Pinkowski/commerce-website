<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	import { fetchProduct } from '$lib/helpers/fetching';
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import GallerySwiper from '$lib/components/Product/GallerySwiper.svelte';
	import ProductDetails from '$lib/components/Product/ProductDetails.svelte';
	import SkeletonGallerySwiper from '$lib/components/Product/SkeletonGallerySwiper.svelte';
	import SkeletonProductDetails from '$lib/components/Product/SkeletonProductDetails.svelte';
	import ProductNotFound from '$lib/components/Product/ProductNotFound.svelte';

	export let data: PageData;
	const productPromise = fetchProduct(data.product as Product, 500); // 500ms delay to simulate network latency

	let breadcrumbs = ['Home', 'Products', data.product.name];
</script>

{#await productPromise}
	<section class="flex flex-col md:flex-row">
		<SkeletonGallerySwiper />
		<SkeletonProductDetails />
	</section>
{:then product}
	<Breadcrumbs {breadcrumbs} />
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
	<!-- FIXME: Products vs Product issue -->
	<!-- <RecommendationsCarousel {products} /> -->
{:catch error}
	<ProductNotFound />
{/await}
