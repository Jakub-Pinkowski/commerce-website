<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import CategoryProductCard from '$lib/components/CategoryProductCard.svelte';

	export let data: PageData;
	export let products = data?.products;

	const itemsPerPage = 8;
	let currentPage = 1;
	let totalPages = 0;
	let displayedProducts: Product[] = [];

	onMount(() => {
		totalPages = Math.ceil(products.length / itemsPerPage);
		updateDisplayedProducts();
	});

	function updateDisplayedProducts() {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		displayedProducts = products.slice(startIndex, endIndex).map((product) => ({
			...product,
			id: product.id.toString() 
		}));
	}

	function goToPage(page: number) {
		currentPage = page;
		updateDisplayedProducts();
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

<div>
	<h1 class="mb-4 text-3xl font-bold">New</h1>
	{#if products}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each displayedProducts as product}
				<CategoryProductCard {product} />
			{/each}
		</div>

		<div class="flex justify-center">
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
	{:else}
		<p>No products found</p>
	{/if}
	<!-- TODO: Recommendation carousel goes here -->
</div>
