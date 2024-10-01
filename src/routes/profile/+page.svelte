<script lang="ts">
	import CardInfo from '$lib/components/Profile/Dashboard/CardInfo.svelte';
	import CardPoints from '$lib/components/Profile/Dashboard/CardPoints.svelte';
	import CardOrders from '$lib/components/Profile/Dashboard/CardOrders.svelte';

	import type { User } from '$lib/types/userTypes';
    import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let data;
	const user: User = data.user;
    const orders: Order[] = data.orders;
    const orderItems: OrderItem[] = data.orderItems;
</script>

<h1 class="p-2 text-3xl font-bold">Dashboard</h1>
<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardInfo {user} />
	<CardPoints {user} />
	<CardOrders {user} {orders} {orderItems} />
</div>
