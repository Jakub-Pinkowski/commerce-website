<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/productTypes.ts';
	import RecommendationsCarousel from '$lib/components/RecommendationsCarousel.svelte';

	import jackets from '$lib/assets/images/jackets.jpg';
	import shoes from '$lib/assets/images/footwear.jpg';
    import pants from '$lib/assets/images/pants.jpg';

	export let data: PageData;
	export let products: Product[] = data?.products;
	let productsPerCarousel = 8;
	let newProducts = products.filter((product) => product.label === 'new');
	let saleProducts = products.filter((product) => product.price < product.listPrice);

	let shoesProducts = products
		.filter((product) => product.category === 'shoes')
		.slice(0, productsPerCarousel);
	let jacketsProducts = products
		.filter((product) => product.category === 'jackets')
		.slice(0, productsPerCarousel);
	let pantsProducts = products
		.filter((product) => product.category === 'pants')
		.slice(0, productsPerCarousel);
</script>

<div>
	<div class="flex justify-center">
		<!-- TODO: Style some nice hero image, it will be seasonal -->
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({shoes});"
		>
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
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={saleProducts} title="Sale" />
	</div>
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({jackets});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-center text-neutral-content">
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
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({pants});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-center text-neutral-content">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl">Pants</h1>
					<p class="mb-5 text-xl">Checkout our collection of pants!</p>
					<a href="/categories/new" class="btn btn-primary">Shop pants</a>
				</div>
			</div>
		</section>
	</div>
	<div class="mb-8">
		<RecommendationsCarousel products={pantsProducts} title="Pants" />
	</div>
</div>

<!-- TODO: To be used later -->
