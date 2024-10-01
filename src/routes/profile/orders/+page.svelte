<script lang="ts">
	import CardOrders from '$lib/components/Profile/Dashboard/CardOrders.svelte';

	import type { User } from '$lib/types/userTypes';

	export let data;
	const user: User = data.user;
</script>

<h1 class="p-2 text-3xl font-bold">Orders</h1>

<div class="grid flex-grow grid-cols-1 gap-4">
	<CardOrders {user} />
	<CardOrders {user} />
</div>
