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
		console.log(wishlist);
	});

	let toastWishlist: boolean = false;
	let toastMessage: string = '';
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

{#if toastWishlist}
	<div class="toast toast-center toast-top" transition:fade>
		<div class="alert alert-success">
			<span> {@html toastMessage}</span>
		</div>
	</div>
{/if}

<style scoped>
	.alert-success {
		--alert-bg: var(--light-accent);
		color: var(--fallback-ac, oklch(var(--ac) / var(--tw-text-opacity)));
		border-color: var(--light-accent);
	}

	.toast:where(.toast-top) {
		top: 50px;
	}
</style>
