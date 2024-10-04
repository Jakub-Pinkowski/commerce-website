<script lang="ts">
	import CardPointsInfo from '$lib/components/Profile/Points/CardPointsInfo.svelte';
    import CardStatusesInfo from '$lib/components/Profile/Points/CardStatusesInfo.svelte';
	import CardPoints from '$lib/components/Profile/Dashboard/CardPoints.svelte';


	import type { User } from '$lib/types/userTypes';
	import type { Order } from '$lib/types/orderTypes';

	export let data;
	const user: User = data.user;
	const orders: Order[] = data.orders;
</script>

<h1 class="p-2 text-3xl font-bold">Commerce points</h1>

<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardPointsInfo />
    <CardStatusesInfo />
	<!-- <CardPoints {user} /> -->
</div>
