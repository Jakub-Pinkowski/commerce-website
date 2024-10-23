<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	const breadcrumbs = ['Home', 'Support', 'Warranty'];
</script>

<Breadcrumbs {breadcrumbs} />

<div class="text-justify">
	<h1 class="mb-4 text-3xl font-bold text-gray-900">Warranty Policy</h1>
	<p class="mt-2 text-gray-700">
		Thank you for purchasing from [Your Company]. This Warranty Policy outlines the terms and
		conditions of our warranty coverage.
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Warranty Coverage</h2>
	<div class="mt-2 text-gray-700">
		Our products are warranted against defects in materials and workmanship for a period of [number
		of years] years from the date of purchase. During this period, we will repair or replace, at no
		charge, products or parts of a product that proves defective because of improper material or
		workmanship, under normal use and maintenance.
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Exclusions</h2>
	<div class="mt-2 text-gray-700">
		This warranty does not cover:
		<ul class="list-disc pl-8 text-gray-700">
			<li>
				Conditions, malfunctions, or damage not resulting from defects in material or workmanship.
			</li>
			<li>
				Damage resulting from improper maintenance, misuse, abuse, or unauthorized modifications.
			</li>
			<li>Products with removed or altered serial numbers.</li>
		</ul>
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">How to Obtain Warranty Service</h2>
	<div class="mt-2 text-gray-700">
		To obtain warranty service, you must first contact us to determine the problem and the most
		appropriate solution for you. Please follow these steps:
		<ul class="list-disc pl-8 text-gray-700">
			<li>Contact us by [method of contact] to initiate the warranty service.</li>
			<li>Provide proof of purchase and a detailed description of the issue.</li>
			<li>Send the product to [warranty service address] if instructed by our support team.</li>
		</ul>
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Shipping Charges</h2>
	<p class="mt-2 text-gray-700">
		You will be responsible for paying for your own shipping costs for returning your item. Shipping
		costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted
		from your refund.
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Contact Us</h2>
	<div class="mt-2 text-gray-700">
		If you have any questions about our Warranty Policy, please contact us:
		<ul class="list-disc pl-8 text-gray-700">
			<li>By email: [Your Email]</li>
			<li>By visiting this page on our website: [Your Website Contact Page]</li>
		</ul>
	</div>
</div>
