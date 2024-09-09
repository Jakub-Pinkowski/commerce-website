<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Company'];
</script>

<Breadcrumbs {breadcrumbs} />

<div class="text-justify">
	<h1 class="mb-4 text-3xl font-bold text-gray-900">Welcome to Company X</h1>
	<p class="mb-4">
		At Company X, we are dedicated to providing our customers with exceptional products and
		services. Our team is committed to innovation, quality, and sustainability, ensuring that every
		interaction with us is positive and memorable.
	</p>
	<p class="mb-4">
		Learn more about our mission, values, and the people behind Company X. We believe in building
		strong relationships with our customers, partners, and communities.
	</p>

	<div class="mt-4">
		<h2 class="mb-2 text-xl font-semibold">Quick Links</h2>
		<ul class="mb-4 list-disc pl-8">
			<li><a class="link" href="/company/about_us">About Us</a></li>
			<li><a class="link" href="/company/contact">Contact</a></li>
		</ul>
	</div>
</div>
