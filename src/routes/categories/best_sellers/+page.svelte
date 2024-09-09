<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import CategoryPage from '$lib/components/CategoryPages/CategoryPage.svelte';

	export let data: PageData;
	const products = data?.products as Product[];

	let title = 'Best Sellers';
	let breadcrumbs = ['Home', 'Categories', 'Best Sellers'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />
