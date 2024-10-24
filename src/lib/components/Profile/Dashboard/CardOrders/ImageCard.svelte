<script lang="ts">
	import type { Product } from '$lib/types/productTypes';

	let { product }: { product: Product } = $props();
</script>

<a
	href={product.url}
	class="max-w-[calc(50%-4px)] flex-grow overflow-hidden rounded-lg border border-gray-300 md:max-w-32"
>
	<img src={product.imageUrl} alt={product.name} class="h-full w-full object-cover" />
</a>
