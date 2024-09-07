<script lang="ts">
	export let data;
</script>

<div>
	{#each data.products as product}
		<div>
			<p>ID: {product.id}</p>
			<p>Name: {product.name}</p>
			<p>Price: {product.price}</p>
			<!-- Add more fields as necessary -->
		</div>
	{/each}
</div>
