<script lang="ts">
	import CardInfo from '$lib/components/Profile/Dashboard/CardInfo.svelte';
	import CardPoints from '$lib/components/Profile/Dashboard/CardPoints.svelte';
	import CardOrders from '$lib/components/Profile/CardOrders.svelte';

	import type { User } from '$lib/types/userTypes';
	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let data;
	const user: User = data.user;
	const orders: Order[] = data.orders;
	const orderItems: OrderItem[] = data.orderItems;
	const products: Product[] = data.products;

    console.log("products", products);

	let recentOrder: boolean = true;

	// Get the latest order
	const sortedOrders = orders.sort(
		(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);
	const latestOrder: Order = sortedOrders[0];

	// Filter order items to match the latest order's ID
	const latestOrderItems: OrderItem[] = orderItems.filter(
		(item) => item.order_id === latestOrder.id
	);

	// Get the latest order's products
	const latestOrderProductIds = latestOrderItems.map((item) => item.product_id);
	const latestOrderProducts: Product[] = products.filter((product) =>
		latestOrderProductIds.includes(product.id)
	);
</script>

<h1 class="p-2 text-3xl font-bold">Dashboard</h1>
<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardInfo {user} />
	<CardPoints {user} />
	<CardOrders
        {recentOrder}
		order={latestOrder}
		orderItems={latestOrderItems}
		products={latestOrderProducts}
	/>
</div>
