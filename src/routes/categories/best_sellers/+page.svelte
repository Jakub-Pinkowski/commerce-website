<script lang="ts">
    import CategoryPage from '$lib/components/CategoryPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const products = data?.products;

    let title = 'Best Sellers';
    let breadcrumbs = ['Home', 'Categories', 'Best Sellers'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />