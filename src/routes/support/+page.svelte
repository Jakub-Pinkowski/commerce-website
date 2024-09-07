<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Support'];
</script>

<Breadcrumbs {breadcrumbs} />

<div class="text-justify">
	<h1 class="mb-4 text-3xl font-bold text-gray-900">Welcome to Customer Support</h1>
	<p class="mb-4">
		Our Customer Support team is here to assist you. Whether you have questions about your order,
		need help navigating our site, or require technical support, we're ready to provide the
		assistance you need to ensure a smooth and satisfying experience.
	</p>
	<p class="mb-4">
		Explore our resources below for answers to common questions, guidance on using our platform, and
		information on how to resolve typical issues. Our aim is to empower you with the knowledge and
		support you need to enjoy your time with us fully.
	</p>
	<ul class="mb-4 list-disc pl-8">
		<li><a class="link" href="/support/faq">Frequently Asked Questions (FAQ)</a></li>
		<li><a class="link" href="/support/shipping">Shipping Information</a></li>
		<li><a class="link" href="/support/order_tracking">Order Tracking</a></li>
		<li><a class="link" href="/support/return_policy">Return Policy</a></li>
		<li><a class="link" href="/support/warranty">Product Warranty</a></li>
	</ul>
	<h2 class="mb-2 text-xl font-semibold">Need More Help?</h2>
	<p class="mb-4">
		If you require further assistance or have questions not addressed in our support sections,
		please reach out to us through our <a class="link" href="/contact">Contact Us</a> page. Our dedicated
		support team is eager to assist you.
	</p>

	<h2 class="mb-2 text-xl font-semibold">Quick Answers</h2>
	<p class="mb-4">
		Looking for fast solutions? Our FAQ section offers quick answers to the most common questions.
		Visit our <a href="/support/faq" class="link"> FAQ</a> for immediate assistance.
	</p>
</div>
