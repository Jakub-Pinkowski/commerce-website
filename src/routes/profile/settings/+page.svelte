<script lang="ts">
	import CardInfo from '$lib/components/Profile/Settings/CardInfo.svelte';
	import CardAddress from '$lib/components/Profile/Settings/CardAddress.svelte';
	import CardPassword from '$lib/components/Profile/Settings/CardPassword.svelte';

	import type { User } from '$lib/types/userTypes';

	export let data;

	const user: User = data.user;
</script>

<h1 class="p-2 text-3xl font-bold">Settings</h1>
<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
	<CardInfo {user} />
	<CardAddress {user} />
	<CardPassword {user} />
</div>