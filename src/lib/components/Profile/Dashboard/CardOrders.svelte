<script lang="ts">
	// TODO: Use real data
	import ImageCard from './CardOrders/ImageCard.svelte';

	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let order: Order;
	export let orderItems: OrderItem[];
	export let products: Product[];

	// Format date
	const formatDate = (date: Date): string => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	// Handle order statuses
	let orderStatuses = ['placed', 'processed', 'dispatched', 'delivered'];

	if (order.status === 'returned') {
		orderStatuses.push('returned');
	}

	let currentStatusIndex = orderStatuses.indexOf(order.status);
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<div class="flex justify-between">
			<h2 class="card-title">Most recent order</h2>
			<!-- Desktop -->
			{#if order.status !== 'cancelled'}
				<ul class="steps hidden gap-4 md:inline-grid">
					{#each orderStatuses as status, index}
						<li class="step text-sm capitalize {index <= currentStatusIndex ? 'step-primary' : ''}">
							{status}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="flex w-full flex-col justify-between md:flex-row">
			<div class="flex-none overflow-x-auto">
				<table class="table">
					<tbody>
						<tr>
							<th>Date</th>
							<td>{formatDate(order.created_at)}</td>
						</tr>
						<tr>
							<th>Order number</th>
							<td>{order.id}</td>
						</tr>
						<tr>
							<th>Items</th>
							<td>{orderItems.length}</td>
						</tr>
						<tr>
							<th>Total</th>
							<td>${order.total_price}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td class="capitalize {order.status === 'cancelled' ? 'text-main-red' : ''}">
								{order.status}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- Desktop -->
			<div class="hidden max-w-2xl flex-grow flex-wrap items-start justify-end gap-2 md:flex">
				{#each products.slice(0, 9) as product}
					<ImageCard {product} />
				{/each}
				{#if orderItems.length > 9}
					<!-- TODO: Replace with a link to this particular order -->
					<a
						href="profile/orders"
						class=" flex h-full max-h-32 max-w-32 flex-grow items-center justify-center overflow-hidden rounded-lg border border-gray-300 opacity-80"
						aria-label="View the order"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Layer_1"
							data-name="Layer 1"
							viewBox="0 0 24 24"
							height="32"
							width="32"
						>
							<path
								d="m5,10c0-.552.448-1,1-1h3v-3c0-.552.448-1,1-1s1,.448,1,1v3h3c.552,0,1,.448,1,1s-.448,1-1,1h-3v3c0,.552-.448,1-1,1s-1-.448-1-1v-3h-3c-.552,0-1-.448-1-1Zm19-1v10c0,2.757-2.243,5-5,5h-10c-2.446,0-4.479-1.768-4.908-4.092-2.324-.429-4.092-2.462-4.092-4.908V5C0,2.243,2.243,0,5,0h10c2.446,0,4.479,1.768,4.908,4.092,2.324.429,4.092,2.462,4.092,4.908ZM5,18h10c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3Zm17-9c0-1.302-.839-2.402-2-2.816v8.816c0,2.757-2.243,5-5,5H6.184c.414,1.161,1.514,2,2.816,2h10c1.654,0,3-1.346,3-3v-10Z"
							/>
						</svg>
					</a>
				{/if}
			</div>
			<!-- Mobile -->
			<div class="flex flex-grow flex-wrap items-center gap-2 md:hidden">
				{#each products.slice(0, 5) as product}
					<ImageCard {product} />
				{/each}
				{#if orderItems.length > 5}
					<!-- TODO: Replace with a link to this particular order -->
					<a
						href="profile/orders"
						class="flex aspect-square max-w-[calc(50%-4px)] flex-grow items-center justify-center overflow-hidden rounded-lg border border-gray-300 opacity-80"
						aria-label="View the order"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Layer_1"
							data-name="Layer 1"
							viewBox="0 0 24 24"
							height="32"
							width="32"
						>
							<path
								d="m5,10c0-.552.448-1,1-1h3v-3c0-.552.448-1,1-1s1,.448,1,1v3h3c.552,0,1,.448,1,1s-.448,1-1,1h-3v3c0,.552-.448,1-1,1s-1-.448-1-1v-3h-3c-.552,0-1-.448-1-1Zm19-1v10c0,2.757-2.243,5-5,5h-10c-2.446,0-4.479-1.768-4.908-4.092-2.324-.429-4.092-2.462-4.092-4.908V5C0,2.243,2.243,0,5,0h10c2.446,0,4.479,1.768,4.908,4.092,2.324.429,4.092,2.462,4.092,4.908ZM5,18h10c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3Zm17-9c0-1.302-.839-2.402-2-2.816v8.816c0,2.757-2.243,5-5,5H6.184c.414,1.161,1.514,2,2.816,2h10c1.654,0,3-1.346,3-3v-10Z"
							/>
						</svg>
					</a>
				{/if}
			</div>
		</div>

		<div class="card-actions mt-auto justify-between pt-2">
			<a href="profile/orders" class="btn btn-primary hidden md:inline-flex md:w-auto">
				See more details
			</a>
			<a href="profile/orders" class="btn btn-accent w-full md:w-auto">See all orders</a>
		</div>
	</div>
</div>
