<script lang="ts">
	import CardPointsInfo from '$lib/components/Profile/Points/CardPointsInfo.svelte';
	import CardStatusesInfo from '$lib/components/Profile/Points/CardStatusesInfo.svelte';
	import CardPoints from '$lib/components/Profile/CardPoints.svelte';
	import CardPointsHistory from '$lib/components/Profile/Points/CardPointsHistory.svelte';

	import type { PageData } from './$types';
	import type { User } from '$lib/types/userTypes';
	import type { Order } from '$lib/types/orderTypes';

	let { data }: { data: PageData } = $props();

	const user: User = data.user;
	const orders: Order[] = data.orders;
</script>

<h1 class="p-2 text-3xl font-bold">Commerce points</h1>

<div class="grid grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardPoints {user} {orders} />
	<CardPointsInfo />
	<CardStatusesInfo />
	<CardPointsHistory {orders} />
</div>
