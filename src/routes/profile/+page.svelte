<script lang="ts">
	import { enhance } from '$app/forms';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Profile'];
</script>

<Breadcrumbs {breadcrumbs} />
<div>
	<div>
		<ul class="menu w-56 rounded-box bg-base-200">
			<li class="menu-title">Your account</li>
			<li><a href="/profile">Dashboard</a></li>
			<li><a href="/profile/settings">Settings</a></li>
			<li><a href="/profile/orders">Your orders</a></li>
			<li><a href="/support">Help and FAQ</a></li>
			<li>
				<form method="post" use:enhance>
					<button>Sign out</button>
				</form>
			</li>
		</ul>
	</div>
</div>
