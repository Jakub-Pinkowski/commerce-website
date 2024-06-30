<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let product = data?.product;
</script>

{#if product}
	<h1>{product.name}</h1>
	<div>{@html product.category}</div>
{:else}
	<h1>No product found</h1>
{/if}
