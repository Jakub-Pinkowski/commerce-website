<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let user: User;
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
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
