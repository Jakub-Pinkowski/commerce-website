<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let data;
	const user: User = data.user;

	console.log('user: ', user);
</script>

<div>
	<h1 class="p-2 text-3xl font-bold">Settings</h1>
</div>
