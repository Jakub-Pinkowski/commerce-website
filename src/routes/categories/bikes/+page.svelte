<script lang="ts">
    import CategoryPage from '$lib/components/CategoryPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const products = data?.products;

    let title = 'Bikes';
    let breadcrumbs = ['Home', 'Categories', 'Bikes'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />