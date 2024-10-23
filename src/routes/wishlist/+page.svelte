<script lang="ts">
    // TODO: Add similar logic as in src/lib/components/Header/MiniCart.svelte 
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import CategoryProductCard from '$lib/components/CategoryPages/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	export let data: PageData;
	let wishlist: Product[] = [];
    
	const breadcrumbs = ['Home', 'Profile', 'Wishlist'];

	onMount(() => {
		data.wishlist.subscribe((items: Product[]) => {
			wishlist = items;
		});
	});

	// TODO: Finish Toast logic, still doesn't work
    // TODO: On mobile, add ability to remove items from wishlist
</script>

<div>
	<Breadcrumbs {breadcrumbs} />
	<h1 class="mb-4 text-3xl font-bold">Wishlist</h1>
	{#if wishlist.length > 0}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each wishlist as product}
				<CategoryProductCard {product} />
			{/each}
		</div>
	{:else}
		<p>Your wishlist is empty.</p>
		<!-- TODO: Add RecommendationsCarousel -->
	{/if}
</div>
