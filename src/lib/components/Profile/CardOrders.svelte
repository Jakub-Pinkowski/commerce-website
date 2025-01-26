<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { capitalizeFirstWordAndRemoveUnderscode } from '$lib/helpers/utils';
	import { formatDate } from '$lib/helpers/utils';
	import ImageCard from './Dashboard/CardOrders/ImageCard.svelte';

	import type { Product } from '$lib/types/productTypes';
	import type { Order, OrderItem } from '$lib/types/orderTypes';

	let {
		order,
		orderItems,
		products,
		recentOrder
	}: {
		order: Order;
		orderItems: OrderItem[];
		products: Product[];
		recentOrder?: boolean;
	} = $props();

	let isExpanded = $state(false);
	let showAll = $state(false);

	// TODO: Finish this, make the order items and order add up
	// Calculate total prices
	let productsDiscounted = false;
	const totalProductsPrice = orderItems.reduce((sum, item) => sum + item.price, 0);
	const totalProductsListPrice = orderItems.reduce((sum, item) => sum + item.listPrice, 0);
	const totalCost = order.totalCost;
	const totalListCost = totalProductsListPrice + order.shippingCost;
	if (totalProductsPrice < totalProductsListPrice) {
		productsDiscounted = true;
	}

	// Handle order statuses
	const orderStatuses = ['placed', 'processed', 'dispatched', 'delivered'];

	if (order.status === 'returned') {
		orderStatuses.push('returned');
	}

	const currentStatusIndex = orderStatuses.indexOf(order.status);

	const toggleExpand = () => {
		isExpanded = !isExpanded;
	};

	const toggleShowAll = () => {
		showAll = !showAll;
	};
</script>

<div class="card bg-base-100 w-full shadow-xl md:col-span-2">
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
				<table class="hidden table md:table">
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
			</div>

			<div class="flex grow flex-wrap items-center gap-2 md:max-w-xl md:items-start md:justify-end">
				{#each showAll ? products : products.slice(0, 3) as product}
					<ImageCard {product} />
				{/each}
				{#if orderItems.length > 3 && !showAll}
					<button
						class="flex aspect-square max-w-[calc(50%-4px)] grow items-center justify-center overflow-hidden rounded-lg border border-gray-300 opacity-80 md:h-full md:max-h-32 md:max-w-32"
						aria-label="View the order"
						onclick={toggleShowAll}
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
					</button>
				{/if}
			</div>
		</div>
		{#if isExpanded}
			<div transition:fade={{ delay: 0, duration: 200, easing: quadOut }}>
				<div class="mt-4 md:mt-0">
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
				<div class="mt-4 flex flex-col gap-8 md:flex-row">
					<div class=" w-full md:w-1/3">
						<table class="table">
							<tbody>
								<tr>
									<th>Products</th>
									<td>${order.totalPrice}</td>
								</tr>
								<tr>
									<th>Shipping cost</th>
									{#if order.shippingCost == 0}
										<td>
											<span class="text-main-red">$0</span>
											<span class="text-gray-500 line-through">$5</span>
										</td>
									{:else}
										<td>
											${order.shippingCost}
										</td>
									{/if}
								</tr>
								{#if order.discount}
									<tr>
										<th>Discount</th>
										<td>{order.discount}%</td>
									</tr>
								{/if}
								<tr>
									<th>Total cost</th>
									<td class="font-bold">
										{#if order.totalCost < totalListCost}
											<span class="text-main-red">${order.totalCost}</span>
											<span class="text-gray-500 line-through">${totalListCost}</span>
										{:else}
											${order.totalCost}
										{/if}
									</td>
								</tr>
								<tr>
									<th>Points earned</th>
									<td class="text-primary font-bold">{order.points}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class=" divider divider-horizontal hidden md:flex"></div>
					<div class="w-full md:w-2/3">
						<!-- Desktop -->
						<table class="hidden table md:table">
							<tbody>
								<tr>
									<th>Delivery address</th>
									<th>Invoice address</th>
								</tr>

								<tr class="border-none">
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
								</tr>
								<tr>
									<th>Shipping method</th>
									<th>Payment method</th>
								</tr>
								<tr>
									<td>
										{capitalizeFirstWordAndRemoveUnderscode(order.shippingMethod)}
									</td>
									<td> {capitalizeFirstWordAndRemoveUnderscode(order.paymentMethod)}</td>
								</tr>
							</tbody>
						</table>
						<!-- Mobile -->
						<table class=" table md:hidden">
							<tbody>
								<tr>
									<th>Delivery address</th>
									<td class="text-xs">
										{order.deliveryAddressStreet}, {order.deliveryAddressCity}
										<br />
										{order.deliveryAddressState}, {order.deliveryAddressPostalcode}
										<br />
										{order.deliveryAddressCountry}
									</td>
								</tr>
								<tr> </tr>
								<tr>
									<th>Invoice address</th>
									<td class="text-xs">
										{order.invoiceAddressStreet}, {order.invoiceAddressCity}
										<br />
										{order.invoiceAddressState}, {order.invoiceAddressPostalcode}
										<br />
										{order.invoiceAddressCountry}
									</td>
								</tr>
								<tr> </tr>
								<tr>
									<th>Shipping method</th>
									<td>
										{capitalizeFirstWordAndRemoveUnderscode(order.shippingMethod)}
									</td>
								</tr>
								<tr>
									<th>Payment method</th>
									<td> {capitalizeFirstWordAndRemoveUnderscode(order.paymentMethod)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}

		<div class="card-actions mt-auto justify-between pt-2">
			<button class="btn btn-primary flex w-full items-center md:w-auto" onclick={toggleExpand}>
				{isExpanded ? 'Hide details' : 'See more details'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Outline"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="#eaeaea"
					class="ml-2 transform transition-transform duration-500 ease-in-out {isExpanded
						? 'rotate-180'
						: ''}"
				>
					<path
						d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"
					/>
				</svg>
			</button>
			{#if recentOrder}
				<a href="profile/orders" class="btn btn-accent w-full md:w-auto">See all orders</a>
			{/if}
		</div>
	</div>
</div>
