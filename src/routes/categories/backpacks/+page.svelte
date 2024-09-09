<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import CategoryPage from '$lib/components/CategoryPages/CategoryPage.svelte';

	export let data: PageData;
	const products = data?.products as Product[];

	let title = 'Backpacks';
	let breadcrumbs = ['Home', 'Categories', 'Backpacks'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />
