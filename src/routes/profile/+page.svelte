<script lang="ts">
	import { enhance } from '$app/forms';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

    import type { User } from '$lib/types/userTypes';

	let breadcrumbs = ['Home', 'Profile'];

	export let data;

</script>

<Breadcrumbs {breadcrumbs} />
<div class="flex gap-4">
	<ul class="menu w-56 rounded-box bg-base-200">
		<li class="menu-title">Your account</li>
		<li><a href="/profile">Dashboard</a></li>
		<li><a href="/profile/orders">Your orders</a></li>
		<li><a href="/profile/settings">Settings</a></li>
		<li><a href="/support">Help and FAQ</a></li>
		<li>
			<form method="post" use:enhance>
				<button>Sign out</button>
			</form>
		</li>
	</ul>
	<div class="grid flex-grow grid-cols-2 gap-4">
		<div class="card w-full bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Account</h2>
				<ul>
					<li>Email</li>
				</ul>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Settings</button>
				</div>
			</div>
		</div>
		<div class="card w-full bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Something goes here, some extra points or stuff</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div>
		<div class="card col-span-2 w-full bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Recent order</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div class="card-actions justify-end">
					<a href="profile/orders" class="btn btn-primary">See all orders</a>
				</div>
			</div>
		</div>
	</div>
</div>
