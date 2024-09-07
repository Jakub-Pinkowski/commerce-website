<script lang="ts">
    import CategoryPage from '$lib/components/CategoryPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const products = data?.products;

    let breadcrumbs = ['Home', 'Categories', 'Best Sellers'];
</script>

<CategoryPage {products} {breadcrumbs} />