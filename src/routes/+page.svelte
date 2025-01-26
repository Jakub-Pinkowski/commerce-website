<script lang="ts">
	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import bikes from '$lib/assets/images/bikes.webp';
	import shoes from '$lib/assets/images/footwear.webp';
	import caps from '$lib/assets/images/caps.webp';
	import newImage from '$lib/assets/images/newImage.webp';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';
	import InfoBanner from '$lib/components/Homepage/InfoBanner.svelte';
	import PromoSection from '$lib/components/Homepage/PromoSection.svelte';

	let { data }: { data: PageData } = $props();
	const products = data?.products as Product[];

	const productsPerCarousel = 8;
	const newProducts = products.filter((product) => product.label === 'new');
	const saleProducts = products.filter((product) => product.price < product.listPrice);

	// Product categories
	const shoesProducts = products
		.filter((product) => product.category === 'shoes')
		.slice(0, productsPerCarousel);
	const backpackProducts = products
		.filter((product) => product.category === 'backpacks')
		.slice(0, productsPerCarousel);
	const capsProducts = products
		.filter((product) => product.category === 'caps')
		.slice(0, productsPerCarousel);
	const bikesProducts = products
		.filter((product) => product.category === 'bikes')
		.slice(0, productsPerCarousel);
</script>

<div>
	<InfoBanner />
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({shoes});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-neutral-content text-center">
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
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={saleProducts} title="Sale" />
	</div>
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({newImage});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-neutral-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl">New Collection</h1>
					<p class="mb-5 text-xl">Checkout our brand new arrivals!</p>
					<a href="/categories/new" class="btn btn-primary">Shop new</a>
				</div>
			</div>
		</section>
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={newProducts} title="New" />
	</div>
	<PromoSection />
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({caps});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-neutral-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl">Caps</h1>
					<p class="mb-5 text-xl">Checkout our collection of caps!</p>
					<a href="/categories/new" class="btn btn-primary">Shop caps</a>
				</div>
			</div>
		</section>
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={capsProducts} title="Caps" />
	</div>
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({bikes});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-neutral-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl">Bikes</h1>
					<p class="mb-5 text-xl">Checkout our collection of bikes!</p>
					<a href="/categories/new" class="btn btn-primary">Shop bikes</a>
				</div>
			</div>
		</section>
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={bikesProducts} title="Bikes" />
	</div>
</div>
