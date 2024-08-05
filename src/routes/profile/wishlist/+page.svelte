<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import { onMount } from 'svelte';

	export let data: PageData;
	let wishlist: Product[] = [];

	onMount(() => {
		data.wishlist.subscribe((items: Product[]) => {
			wishlist = items;
		});
	});
	console.log(wishlist);
</script>

<div>
	<div class="breadcrumbs mb-6 text-xs">
		<ul>
			<li><a href="/">Profile</a></li>
			<li>Wishlist</li>
		</ul>
	</div>
	<h1>Wishlist</h1>
	{#if wishlist.length > 0}
		<ul>
			{#each wishlist as item}
				<li>{item.name}</li>
			{/each}
		</ul>
	{:else}
		<p>Your wishlist is empty.</p>
	{/if}
</div>
