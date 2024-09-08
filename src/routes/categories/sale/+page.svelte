<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import CategoryPage from '$lib/components/CategoryPage.svelte';

	export let data: PageData;
	const products = data?.products as Product[];

    let title = 'Sale';
    let breadcrumbs = ['Home', 'Categories', 'Sale'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />