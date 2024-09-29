<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	import CardInfo from '$lib/components/Profile/Dashboard/CardInfo.svelte';
	import CardPoints from '$lib/components/Profile/Dashboard/CardPoints.svelte';
	import CardOrders from '$lib/components/Profile/Dashboard/CardOrders.svelte';

	export let data;
	const user: User = data.user;
</script>

<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardInfo {user} />
	<CardPoints {user} />
	<CardOrders {user} />
</div>
