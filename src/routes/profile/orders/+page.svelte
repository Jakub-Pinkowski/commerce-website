<script lang="ts">
	import CardOrders from '$lib/components/Profile/CardOrders.svelte';

	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let data;
	const orders: Order[] = data.orders;
	const orderItems: OrderItem[] = data.orderItems;
	const products: Product[] = data.products;

	// Function to filter order items and products for each order
	const getOrderDetails = (order: Order) => {
		const filteredOrderItems = orderItems.filter((item) => item.order_id === order.id);
		const productIds = filteredOrderItems.map((item) => item.product_id);
		const filteredProducts = products.filter((product) => productIds.includes(product.id));
		return { order, orderItems: filteredOrderItems, products: filteredProducts };
	};

	// Sort orders by date in descending order
	const sortedOrders = orders.sort(
		(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);
	const ordersWithDetails = sortedOrders.map(getOrderDetails);
</script>

<h1 class="p-2 text-3xl font-bold">Orders</h1>

<div class="grid flex-grow grid-cols-1 gap-4">
	{#each ordersWithDetails as { order, orderItems, products }}
		<CardOrders {order} {orderItems} {products} />
	{/each}
</div>
