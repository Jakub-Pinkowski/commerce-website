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
			</ul>
			<div class="card-actions mt-auto justify-end pt-2">
				<a href="profile/settings" class="btn btn-accent">Edit your info</a>
			</div>
		</div>
	</div>
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body">
			<!-- TODO: Make it dynamic later -->
			<h2 class="card-title">Commerce points</h2>
			<!-- 
             -->
			<div class="stats shadow">
				<div class="stat">
					<div class="stat-figure text-primary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-8 w-8 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							></path>
						</svg>
					</div>
					<div class="stat-title">Points</div>
					<div class="stat-value text-primary">250</div>

					<div class="stat-desc">+30 in the last month</div>
				</div>

				<div class="stat">
					<div class="stat-figure text-secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-8 w-8 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							>
							</path>
						</svg>
					</div>
					<div class="stat-title">Status</div>
					<div class="stat-value text-secondary">Bronze</div>
					<div class="stat-desc">60 points to Silver</div>
				</div>
			</div>
			<div class="card-actions mt-auto justify-end pt-2">
				<a href="profile/points" class="btn btn-accent">See your Commerce points</a>
			</div>
		</div>
	</div>
	<div class="card col-span-2 w-full bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="flex justify-between">
				<h2 class="card-title">Most recent order</h2>
				<ul class="steps gap-4">
					<li class="step step-primary text-sm">Order placed</li>
					<li class="step step-primary text-sm">Order confirmed</li>
					<li class="step text-sm">Order in progress</li>
					<li class="step text-sm">Order shipped</li>
					<li class="step text-sm">Order delivered</li>
				</ul>
			</div>
			<!-- TODO: Make it dynamic later -->
			<div class="flex w-full justify-between">
				<div class="flex-none overflow-x-auto">
					<table class="table">
						<tbody>
							<tr>
								<th>Date</th>
								<td>26.09.2024</td>
							</tr>
							<tr>
								<th>Order number</th>
								<td>1212412</td>
							</tr>
							<tr>
								<th>Items</th>
								<td>4</td>
							</tr>
							<tr>
								<th>Total</th>
								<td>$150</td>
							</tr>
							<tr>
								<th>Status</th>
								<td>Order confirmed</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="flex max-h-40 max-w-2xl flex-grow justify-end gap-2">
					<a
						href="http://localhost:5173/products/hiking-backpack-20l"
						class="max-w-40 flex-grow overflow-hidden rounded-lg border border-gray-300"
					>
						<img
							src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
							alt=""
						/>
					</a>
					<a
						href="http://localhost:5173/products/lavender-dream-sneakers"
						class="max-w-40 flex-grow overflow-hidden rounded-lg border border-gray-300"
					>
						<img
							src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
							alt=""
						/>
					</a>
					<a
						href="http://localhost:5173/products/hiking-backpack-20l"
						class="max-w-40 flex-grow overflow-hidden rounded-lg border border-gray-300"
					>
						<img
							src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
							alt=""
							class="h-full w-full object-cover"
						/>
					</a>
					<a
						href="http://localhost:5173/products/lavender-dream-sneakers"
						class="max-w-40 flex-grow overflow-hidden rounded-lg border border-gray-300"
					>
						<img
							src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
							alt=""
						/>
					</a>
				</div>
			</div>

			<div class="card-actions mt-auto justify-between pt-2">
				<a href="profile/orders" class="btn btn-primary">See more details</a>
				<a href="profile/orders" class="btn btn-accent">See all orders</a>
			</div>
		</div>
	</div>
</div>
