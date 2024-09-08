<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/productTypes';

	export let itemsPerPage = 8;
	export let products: Product[] = [];
	export let displayedProducts: Product[] = [];
    
	let currentPage = 1;
	let totalPages = 0;

	export const dispatch = createEventDispatcher();

	onMount(() => {
		totalPages = Math.ceil(products.length / itemsPerPage);
		updateDisplayedProducts();
	});

	function updateDisplayedProducts() {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		displayedProducts = products.slice(startIndex, endIndex);
		dispatch('update', { displayedProducts });
	}

	function goToPage(page: number) {
		currentPage = page;
		updateDisplayedProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function nextPage() {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	}
</script>

<div class="my-8 flex justify-center w-full">
	<div class="join">
		{#if currentPage > 1}
			<button on:click={prevPage} class="btn join-item">«</button>
		{/if}

		{#each Array(totalPages).fill(undefined) as _, i}
			<button
				class="btn join-item {currentPage === i + 1 ? 'btn-active' : ''}"
				on:click={() => goToPage(i + 1)}
			>
				{i + 1}
			</button>
		{/each}

		{#if currentPage < totalPages}
			<button on:click={nextPage} class="btn join-item">»</button>
		{/if}
	</div>
</div>
