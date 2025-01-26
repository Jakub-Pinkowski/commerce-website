<script lang="ts">
	import CategoryPage from '$lib/components/CategoryPages/CategoryPage.svelte';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	let { data }: { data: PageData } = $props();

	const title = 'All Products';
	const products = data?.products as Product[];
	const breadcrumbs = ['Home', 'Products'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />
