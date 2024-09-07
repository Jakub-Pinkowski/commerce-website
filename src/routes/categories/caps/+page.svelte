<script lang="ts">
    import CategoryPage from '$lib/components/CategoryPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const products = data?.products;

    let title = 'Caps';
    let breadcrumbs = ['Home', 'Categories', 'Caps'];
</script>

<CategoryPage {title} {products} {breadcrumbs} />