<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	const breadcrumbs = ['Home', 'Support', 'Order Tracking'];
</script>

<Breadcrumbs {breadcrumbs} />

<div class="text-justify">
	<h1 class="mb-4 text-3xl font-bold text-gray-900">Order Tracking</h1>
	<p class="mt-2 text-gray-700">
		Thank you for shopping at [Your Company]. You can track your order status using the information
		provided below.
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">How to Track Your Order</h2>
	<div class="mt-2 text-gray-700">
		To track your order, please follow these steps:
		<ul class="list-disc pl-8 text-gray-700">
			<li>
				Visit the <a href="/profile/orders" class="text-blue-500 underline">Order Tracking Page</a>.
			</li>
			<li>Enter your order number and email address in the provided fields.</li>
			<li>Click the "Track" button to view your order status and shipping details.</li>
		</ul>
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Order Status Definitions</h2>
	<div class="mt-2 text-gray-700">
		Here are the possible statuses your order might have:
		<ul class="list-disc pl-8 text-gray-700">
			<li><strong>Processing:</strong> Your order has been received and is being processed.</li>
			<li><strong>Shipped:</strong> Your order has been shipped and is on its way to you.</li>
			<li><strong>Delivered:</strong> Your order has been delivered to the specified address.</li>
			<li>
				<strong>Cancelled:</strong> Your order has been cancelled. Please contact us for more information.
			</li>
		</ul>
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Contact Us</h2>
	<div class="mt-2 text-gray-700">
		If you have any questions about your order status, please contact us:
		<ul class="list-disc pl-8 text-gray-700">
			<li>By email: [Your Email]</li>
			<li>By visiting this page on our website: [Your Website Contact Page]</li>
		</ul>
	</div>
</div>
