<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	import jackets from '$lib/assets/images/jackets.jpg';
	import shoes from '$lib/assets/images/footwear.jpg';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let newProducts = products.filter((product) => product.label === 'new');
	let saleProducts = products.filter((product) => product.price < product.listPrice);
</script>

<div>
	<!-- TODO: Style some nice hero image, it will be seasonal -->
	<section class="hero ml-[-2rem] w-screen md:h-96" style="background-image: url({shoes});">
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl">Summer Sale</h1>
				<p class="mb-2 text-xl">Don't miss out on our summer sale!</p>
				<p class="mb-5 text-xl">
					Get up to <span class="text-2xl font-bold">50%</span> off on selected items.
				</p>
				<a href="/categories/sale" class="btn btn-accent">Shop sale</a>
			</div>
		</div>
	</section>
	<div class="mb-8">
		<RecommendationsCarousel products={saleProducts} title="Sale" />
		<div class="flex justify-center">
			<a href="/categories/sale" class="btn btn-accent"> View all products on sale </a>
		</div>
	</div>
	<section class="hero ml-[-2rem] w-screen md:h-96" style="background-image: url({jackets});">
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl">New Collection</h1>
				<p class="mb-5 text-xl">Checkout our brand new arrivals!</p>
				<a href="/categories/new" class="btn btn-primary">Shop new</a>
			</div>
		</div>
	</section>
	<div class="mb-8">
		<RecommendationsCarousel products={newProducts} title="Sale" />
		<div class="flex justify-center">
			<a href="/categories/new" class="btn btn-primary"> View all new products </a>
		</div>
	</div>
	<section class="hero ml-[-2rem] w-screen md:h-96" style="background-image: url({jackets});">
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl">Pants</h1>
				<p class="mb-5 text-xl">Checkout our collection of pants!</p>
				<a href="/categories/new" class="btn btn-primary">Shop pants</a>
			</div>
		</div>
	</section>
    <!-- TODO: Create real pants category -->
	<div class="mb-8">
		<RecommendationsCarousel products={products} title="Sale" />
		<div class="flex justify-center">
			<a href="/categories/pants" class="btn btn-primary"> View all pants </a>
		</div>
	</div>
</div>

<!-- TODO: To be used later -->
