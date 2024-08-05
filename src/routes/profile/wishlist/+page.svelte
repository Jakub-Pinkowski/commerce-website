<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { PageData } from './$types';
	import { toggleWishlist } from '$lib/stores/wishlist';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	let wishlist: Product[] = [];

	onMount(() => {
		data.wishlist.subscribe((items: Product[]) => {
			wishlist = items;
		});
		console.log("wishlist", wishlist);
	});

    // TODO: Finish Toast logic, still doesn't work
</script>

<div>
	<div class="breadcrumbs mb-6 text-xs">
		<ul>
			<li><a href="/">Profile</a></li>
			<li>Wishlist</li>
		</ul>
	</div>
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