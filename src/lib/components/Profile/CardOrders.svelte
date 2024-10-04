<script lang="ts">
	// TODO: Use real data
	import ImageCard from './Dashboard/CardOrders/ImageCard.svelte';
	import { capitalizeFirstWordAndRemoveUnderscode } from '$lib/helpers/utils';

	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	export let order: Order;
	export let orderItems: OrderItem[];
	export let products: Product[];
	export let recentOrder: boolean = false;

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

	// Manage expanded state
	let isExpanded = true;

	const toggleExpand = () => {
		isExpanded = !isExpanded;
	};
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<div class="flex justify-between">
			{#if recentOrder}
				<h2 class="card-title">Latest order</h2>
			{:else}
				<h2 class="card-title">{formatDate(order.createdAt)}</h2>
			{/if}
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
				<!-- Desktop -->
				<table class="table hidden md:table">
					<tbody>
						<tr>
							{#if recentOrder}
								<th>Date</th>
							{/if}
							<th>Order number</th>
							<th>Products</th>
							<th>Total</th>
							<th>Status</th>
						</tr>
						<tr>
							{#if recentOrder}
								<td>{formatDate(order.createdAt)}</td>
							{/if}
							<td>{order.id}</td>
							<td>{orderItems.length}</td>
							<td>${order.totalCost}</td>
							<td class="capitalize {order.status === 'cancelled' ? 'text-main-red' : ''}">
								{order.status}
							</td>
						</tr>
					</tbody>
				</table>

				<!-- Mobile -->
				<table class="table md:hidden">
					<tbody>
						{#if recentOrder}
							<tr>
								<th>Date</th>
								<td>{formatDate(order.createdAt)}</td>
							</tr>
						{/if}
						<tr>
							<th>Order number</th>
							<td>{order.id}</td>
						</tr>
						<tr>
							<th>Products</th>
							<td>{orderItems.length}</td>
						</tr>
						<tr>
							<th>Total</th>
							<td>${order.totalCost}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td class="capitalize {order.status === 'cancelled' ? 'text-main-red' : ''}">
								{order.status}
							</td>
						</tr>
					</tbody>
				</table>
				{#if isExpanded}
					<div class="mt-4 block md:hidden">
						<h2 class="card-title">Products</h2>
						<table class="table">
							<tbody>
								<tr>
									<th>Products</th>
									<td>{orderItems.length}</td>
								</tr>
								<tr>
									<th>Total</th>
									<td>${order.totalCost}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>

			<!-- Desktop -->
			<div class="hidden max-w-xl flex-grow flex-wrap items-start justify-end gap-2 md:flex">
				{#each products.slice(0, 3) as product}
					<ImageCard {product} />
				{/each}
				{#if orderItems.length > 3}
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
				{#each products.slice(0, 3) as product}
					<ImageCard {product} />
				{/each}
				{#if orderItems.length > 3}
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
		{#if isExpanded}
			<div class="mt-4 hidden md:block">
				<h2 class="card-title">Products</h2>
				<table class="table">
					<tbody>
						{#each orderItems as item}
							{#each products as product (product.id)}
								{#if product.id === item.productId}
									<tr>
										<td class="flex items-center">
											<div class="flex-none">
												<a href={product.url}>
													<img
														src={product.imageUrl}
														alt={product.name}
														class="h-24 w-24 object-cover"
													/>
												</a>
											</div>
											<div class="flex flex-1 flex-col gap-2 pl-4">
												<p class="font-bold">{product.name}</p>
												<p>Quantity: {item.quantity}</p>
												{#if item.price < item.listPrice}
													<p>
														Price:
														<span class="text-main-red">${item.price}</span>
														<span class="text-gray-500 line-through">${item.listPrice}</span>
													</p>
												{:else}
													<p>Price: ${item.price}</p>
												{/if}
											</div>
										</td>
									</tr>
								{/if}
							{/each}
						{/each}
					</tbody>
				</table>
			</div>
			<div class="mt-4 flex gap-8">
				<div class="w-1/3">
					<table class="table">
						<tbody>
							<tr>
								<th>Products</th>
								<td>${order.totalPrice}</td>
							</tr>
							<tr>
								<th>Shipping cost</th>
								<td>${order.shippingCost}</td>
							</tr>
							{#if order.discount}
								<tr>
									<th>Discount</th>
									<td>{order.discount}%</td>
								</tr>
							{/if}
							<tr>
								<th>Total cost</th>
								<td>${order.totalCost}</td>
							</tr>
							<tr>
								<th>Points earned</th>
								<td>{order.points}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="divider divider-horizontal"></div>
				<div class="w-2/3">
					<table class="table">
						<tbody>
							<tr>
								<th class="pt-0">Delivery address</th>
								<th class="pt-0">Invoice address</th>
								<th class="pt-0">Payment method</th>
							</tr>
							<tr>
								<td>
									{order.deliveryAddressStreet}, {order.deliveryAddressCity}
									<br />
									{order.deliveryAddressState}, {order.deliveryAddressPostalcode}
									<br />
									{order.deliveryAddressCountry}
								</td>
								<td>
									{order.invoiceAddressStreet}, {order.invoiceAddressCity}
									<br />
									{order.invoiceAddressState}, {order.invoiceAddressPostalcode}
									<br />
									{order.invoiceAddressCountry}
								</td>
								<td> {capitalizeFirstWordAndRemoveUnderscode(order.paymentMethod)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{/if}

		<div class="card-actions mt-auto justify-between pt-2">
			<!-- TODO: Change the look of this button -->
			<button class="btn btn-primary w-full md:w-auto" on:click={toggleExpand}>
				{isExpanded ? 'Hide details' : 'See more details'}
			</button>
			{#if recentOrder}
				<a href="profile/orders" class="btn btn-accent w-full md:w-auto">See all orders</a>
			{/if}
		</div>
	</div>
</div>
