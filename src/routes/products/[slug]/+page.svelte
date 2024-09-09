<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import GallerySwiper from '$lib/components/Product/GallerySwiper.svelte';
	import ProductDetails from '$lib/components/Product/ProductDetails.svelte';
	import SkeletonGallerySwiper from '$lib/components/UI/skeletons/SkeletonGallerySwiper.svelte';
	import SkeletonProductDetails from '$lib/components/UI/skeletons/SkeletonProductDetails.svelte';
	import ProductNotFound from '$lib/components/Product/ProductNotFound.svelte';

	export let data: PageData;

	async function fetchProduct(data: PageData): Promise<Product> {
		if (data?.product) {
			return data.product as Product;
		} else {
			throw new Error('Product not found');
		}
	}

	const productPromise = fetchProduct(data);

	let breadcrumbs = ['Home', 'Products', data.product.name ];
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
