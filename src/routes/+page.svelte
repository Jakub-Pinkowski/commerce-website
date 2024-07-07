<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'New');
	let saleProducts = products.filter((product) => product.price < product.listPrice);
</script>

<div>
	<!-- TODO: Style some nice hero image, it will be seasonal -->
	<section
		class="hero ml-[-2rem] w-screen md:h-96"
		style="background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);"
	>
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl">Summer Sale</h1>
				<p class="mb-5">Don't miss out on our summer sale! Get up to 50% off on selected items.</p>
				<a href="/categories/sale" class="btn btn-accent">Shop sale</a>
			</div>
		</div>
	</section>
    <!-- TODO: I want a tabbed rec here -->
</div>
