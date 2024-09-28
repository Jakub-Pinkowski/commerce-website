<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	import type { User } from '$lib/types/userTypes';

	let breadcrumbs = ['Home', 'Profile'];

	export let data;
	const user: User = data.user;
	console.log('user from +page', user);
</script>

<div class="grid flex-grow grid-cols-2 gap-4">
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Account</h2>
			<!-- TODO: Style later -->
			<ul>
				<li>
					<strong>Name:</strong>
					{#if user.name}
						<span>{user.name}</span>
					{:else}
						<span class="text-dark-secondary-accent">missing</span>
					{/if}
				</li>
				<li>
					<strong>Email:</strong>
					{#if user.email}
						<span>{user.email}</span>
					{:else}
						<span class="text-dark-secondary-accent">missing</span>
					{/if}
				</li>
				<li>
					<strong>Phone:</strong>
					{#if user.phone_number}
						<span>{user.phone_number}</span>
					{:else}
						<span class="text-dark-secondary-accent">missing</span>
					{/if}
				</li>
				<li>
					<strong>Address:</strong>
					{#if user.address}
						<span>{user.address}</span>
					{:else}
						<span class="text-dark-secondary-accent">missing</span>
					{/if}
				</li>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Edit data</button>
				</div>
			</ul>
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
			<p>Some nice way to show recent order here</p>
			<div class="card-actions justify-end">
				<a href="profile/orders" class="btn btn-primary">See all orders</a>
			</div>
		</div>
	</div>
</div>
