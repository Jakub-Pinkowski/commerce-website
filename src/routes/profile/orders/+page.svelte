<script lang="ts">
	import CardOrders from '$lib/components/Profile/Dashboard/CardOrders.svelte';

	import type { User } from '$lib/types/userTypes';
	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let data;
	const orders: Order[] = data.orders;
	const orderItems: OrderItem[] = data.orderItems;
	const products: Product[] = data.products;
</script>

<h1 class="p-2 text-3xl font-bold">Orders</h1>

<div class="grid flex-grow grid-cols-1 gap-4">
	<!-- TODO: Make it dynamic -->
	{#each orders as order}
		<CardOrders {order} {orderItems} {products} />
	{/each}
</div>
