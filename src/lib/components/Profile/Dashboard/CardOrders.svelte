<script lang="ts">
	// TODO: Use real data
	import type { User } from '$lib/types/userTypes';

	export let user: User;
	console.log('user', user);

	// Handle order statuses
	let placeholderOrderStatus = 'Order in progress';
	const orderStatuses = [
		'Order placed',
		'Order confirmed',
		'Order in progress',
		'Order shipped',
		'Order delivered'
	];

	let currentStatusIndex = orderStatuses.indexOf(placeholderOrderStatus);
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<div class="flex justify-between">
			<h2 class="card-title">Most recent order</h2>
			<ul class="steps gap-4">
				{#each orderStatuses as status, index}
					<li class="step text-sm {index <= currentStatusIndex ? 'step-primary' : ''}">
						{status}
					</li>
				{/each}
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
			<div class="flex max-w-2xl flex-grow flex-wrap items-center gap-2">
				<a
					href="http://localhost:5173/products/hiking-backpack-20l"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
						alt=""
						class="h-full w-full object-cover"
					/>
				</a>
				<a
					href="http://localhost:5173/products/lavender-dream-sneakers"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
						alt=""
					/>
				</a>
				<a
					href="http://localhost:5173/products/hiking-backpack-20l"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
						alt=""
						class="h-full w-full object-cover"
					/>
				</a>
				<a
					href="http://localhost:5173/products/lavender-dream-sneakers"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
						alt=""
					/>
				</a>
				<a
					href="http://localhost:5173/products/hiking-backpack-20l"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
						alt=""
						class="h-full w-full object-cover"
					/>
				</a>
				<a
					href="http://localhost:5173/products/lavender-dream-sneakers"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
						alt=""
					/>
				</a>
				<a
					href="http://localhost:5173/products/lavender-dream-sneakers"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/shoes/lavender-dream-sneakers/lavender-dream-sneakers_0-yABKYSc3MQtDmiNrLnSqBAAe7byDzX.webp"
						alt=""
					/>
				</a>
				<a
					href="http://localhost:5173/products/hiking-backpack-20l"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
						alt=""
						class="h-full w-full object-cover"
					/>
				</a>
				<a
					href="http://localhost:5173/products/hiking-backpack-20l"
					class="max-w-32 flex-grow overflow-hidden rounded-lg border border-gray-300"
				>
					<img
						src="https://jfj98xnxolpszjbj.public.blob.vercel-storage.com/assets/products/backpacks/hiking-backpack-20l/hiking-backpack-20l_0-6RdYmsQKes9PXdFe3g5bQeppap94Jx.webp"
						alt=""
						class="h-full w-full object-cover"
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
