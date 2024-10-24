<script lang="ts">
	import CategoryPage from '$lib/components/CategoryPages/CategoryPage.svelte';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	let { data }: { data: PageData } = $props();
	const products = data?.products as Product[];

	const title = 'Sale';
	const breadcrumbs = ['Home', 'Categories', 'Sale'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />
