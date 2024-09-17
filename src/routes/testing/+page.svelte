<script lang="ts">
	export let data: { products: any[] };
	let products = data.products;
</script>

<div>
	{#if products.length > 0}
		<ul>
			{#each products as product}
				<li>
					<strong>{product.name}</strong> - {product.description} - ${product.price}
				</li>
			{/each}
		</ul>
	{:else}
		<p>Loading products...</p>
	{/if}
</div>
