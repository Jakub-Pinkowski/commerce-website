<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Support', 'Shipping Policy'];
</script>

<Breadcrumbs {breadcrumbs} />

<div class="text-justify">
	<h1 class="mb-4 text-3xl font-bold text-gray-900">Shipping Policy</h1>
	<p class="mt-2 text-gray-700">
		Thank you for shopping at [Your Company]. Following are the terms and conditions that constitute
		our Shipping Policy.
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Domestic Shipping Policy</h2>
	<div class="mt-2 text-gray-700">
		<ul class="list-disc pl-8 text-gray-700">
			<li>
				Shipment processing time: All orders are processed within [number of days] business days.
			</li>
			<li>
				Shipping rates & delivery estimates: Shipping charges for your order will be calculated and
				displayed at checkout.
			</li>
			<li>
				Shipment confirmation & Order tracking: You will receive a Shipment Confirmation email once
				your order has shipped containing your tracking number(s).
			</li>
		</ul>
	</div>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">International Shipping Policy</h2>
	<p class="mt-2 text-gray-700">We currently do not ship outside [Country].</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Customs, Duties, and Taxes</h2>
	<p class="mt-2 text-gray-700">
		[Your Company] is not responsible for any customs and taxes applied to your order. All fees
		imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Damages</h2>
	<p class="mt-2 text-gray-700">
		[Your Company] is not liable for any products damaged or lost during shipping. If you received
		your order damaged, please contact the shipment carrier to file a claim.
	</p>

	<h2 class="mt-6 text-xl font-semibold text-gray-900">Contact Us</h2>
	<div class="mt-2 text-gray-700">
		If you have any questions about our Shipping Policy, please contact us:
		<ul class="list-disc pl-8 text-gray-700">
			<li>By email: [Your Email]</li>
			<li>By visiting this page on our website: [Your Website Contact Page]</li>
		</ul>
	</div>
</div>
