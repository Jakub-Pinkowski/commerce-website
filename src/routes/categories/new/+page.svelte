<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryPage from '$lib/components/CategoryPage.svelte';

	export let data: PageData;
	const products = data?.products as Product[];

    let title = 'New';
    let breadcrumbs = ['Home', 'Categories', 'New'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />