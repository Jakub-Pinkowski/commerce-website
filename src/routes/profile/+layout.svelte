<script lang="ts">
	import { enhance } from '$app/forms';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	import type { User } from '$lib/types/userTypes';

	export let data;
	const user: User = data.user;

	let breadcrumbs = ['Home', 'Profile'];
</script>

<div class="flex gap-4">
	<ul class="menu h-fit w-56 rounded-box bg-base-200">
		<li class="menu-title">Your account</li>
		<li><a href="/profile">Dashboard</a></li>
		<li><a href="/profile/points">Your points</a></li>
		<li><a href="/profile/orders">Your orders</a></li>
		<li><a href="/profile/settings">Settings</a></li>
        <li><a href="/wishlist">Wishlist</a></li>
		<li>
			<a href="/profile/logout">
				<button>Logout</button>
			</a>
		</li>
	</ul>
	<slot />
</div>
