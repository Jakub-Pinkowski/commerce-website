<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import GallerySwiper from '$lib/components/Product/GallerySwiper.svelte';
	import ProductDetails from '$lib/components/Product/ProductDetails.svelte';
	import PageNotFound from '$lib/components/Common/PageNotFound.svelte';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	let { data }: { data: PageData } = $props();

	const product = data?.product as Product;
	const breadcrumbs = ['Home', 'Products', product?.name];
</script>

{#if product}
	<Breadcrumbs {breadcrumbs} />
	<section class="flex flex-col md:flex-row">
		<GallerySwiper {product} />
		<ProductDetails {product} />
	</section>
	<!-- <RecommendationsCarousel {products} /> -->
{:else}
	<PageNotFound />
{/if}
