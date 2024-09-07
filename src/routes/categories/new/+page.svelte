<script lang="ts">
    import CategoryPage from '$lib/components/CategoryPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const products = data?.products;

    let title = 'New';
    let breadcrumbs = ['Home', 'Categories', 'New'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />