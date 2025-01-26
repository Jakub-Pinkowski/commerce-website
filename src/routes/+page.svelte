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
	import PromoBanner from '$lib/components/Homepage/PromoBanner.svelte';

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
	<PromoBanner
		image={newImage}
		title="New Collection"
		subTitle="Checkout our brand new arrivals!"
		linkText="Shop new"
		linkHref="/categories/new"
	/>
	<div class="mb-8">
		<RecommendationsCarousel products={newProducts} title="New" />
	</div>
	<PromoSection />
	<PromoBanner
		image={caps}
		title="Caps"
		subTitle="Checkout our collection of caps!"
		linkText="Shop caps"
		linkHref="/categories/caps"
	/>
	<div class="mb-8">
		<RecommendationsCarousel products={capsProducts} title="Caps" />
	</div>
	<PromoBanner
		image={bikes}
		title="Bikes"
		subTitle="Checkout our collection of bikes!"
		linkText="Shop bikes"
		linkHref="/categories/bikes"
	/>
	<div class="mb-8">
		<RecommendationsCarousel products={bikesProducts} title="Bikes" />
	</div>
</div>
