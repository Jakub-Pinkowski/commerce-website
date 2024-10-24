<script lang="ts">
	import { fade } from 'svelte/transition';

	import RecommendationsCarousel from '$lib/components/Common/RecommendationsCarousel.svelte';
	import bikes from '$lib/assets/images/bikes.webp';
	import shoes from '$lib/assets/images/footwear.webp';
	import caps from '$lib/assets/images/caps.webp';
	import newImage from '$lib/assets/images/newImage.webp';

	import type { PageData } from './$types';
	import type { Product } from '$lib/types/productTypes';

	let { data }: { data: PageData } = $props();
	const products = data?.products as Product[];

	const productsPerCarousel = 8;
	const newProducts = products.filter((product) => product.label === 'new');
	const saleProducts = products.filter((product) => product.price < product.listPrice);

	let showBanner: boolean = $state(true);

	const hideBanner = () => {
		showBanner = false;
	};

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
	{#if showBanner}
		<div class="flex justify-center" transition:fade>
			<section
				class="hero relative mx-[-1.5rem] mb-2 w-screen border-y border-accent md:mx-[-2rem]"
			>
				<button
					class="rounded-full0 btn btn-circle btn-ghost absolute right-2 top-2 z-10"
					aria-label="Close banner"
					onclick={hideBanner}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Outline"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
						/>
					</svg>
				</button>
				<div class="hero-overlay bg-light-accent bg-opacity-60"></div>
				<div class="hero-content max-w-full text-center text-neutral-content">
					<div class="max-w-[85%] text-dark md:max-w-full">
						<h1 class="mb-2 text-xl">
							This project is still a work in progress, website is under constant development.
						</h1>
						<h2 class="text-bold mb-4 text-xl text-secondary">New features added regularly!</h2>
						<p class="mb-1 text-xs">
							Disclaimer: This website is a demonstration project and not an actual e-commerce
							store. You cannot make purchases here. All names or brands mentioned are purely
							fictional and all products' images have been AI generated.
						</p>
						<p class="mb-1 text-xs">
							Anonymous data is collected for analytics and performace purposes only. <strong
								>No cookies are used for these purposes.</strong
							>
							By using this website, you agree to this data collection. For more information, see the
							official Vercel's
							<a
								class="link"
								href="https://vercel.com/docs/analytics/privacy-policy#data-point-information"
								target="_blank">Analytics</a
							>
							and
							<a
								class="link"
								href="https://vercel.com/docs/speed-insights/privacy-policy#how-the-data-points-are-tracked"
								target="_blank">Speed insights</a
							> privacy policies.
						</p>
						<p class="text-xs">
							The website uses cookies for user authentication, user profiles, managing orders, and
							OAuth. By creating an account, you agree to the use of those cookies.
						</p>
					</div>
				</div>
			</section>
		</div>
	{/if}
	<div class="flex justify-center">
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
			style="background-image: url({newImage});"
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
	<!-- Experimental -->
	<div class="my-8 flex justify-center">
		<div class="stats stats-vertical text-center md:stats-horizontal">
			<div class="stat w-full">
				<div class="stat-value mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Layer_1"
						data-name="Layer 1"
						viewBox="0 0 24 24"
						width="36"
						height="36"
						class="inline-block"
					>
						<path
							d="m24,10c0-2.757-2.243-5-5-5h-2v-1c0-1.654-1.346-3-3-3h-2v2h2c.552,0,1,.449,1,1v13H2v-4H0v6h2.037c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h6.074c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h2.037v-9ZM7,19.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm12-12.5c1.654,0,3,1.346,3,3v1h-5v-4h2Zm1,12.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm-3-2.5v-4h5v4h-5ZM10,3H0V1h10v2Zm-2,4H0v-2h8v2Zm-2,4H0v-2h6v2Z"
						/>
					</svg>
				</div>
				<div class="stat-title whitespace-normal font-semibold">
					Free shipping for orders over €99
				</div>
			</div>
			<div class="stat w-full">
				<div class="stat-value mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Layer_1"
						data-name="Layer 1"
						viewBox="0 0 24 24"
						width="36"
						height="36"
						class="inline-block"
					>
						<path
							d="m22,12h2c0,6.617-5.383,12-12,12-4.055,0-7.794-2.058-9.995-5.368l-.005,2.368H0v-3.991c0-1.107.901-2.009,2.008-2.009h3.992v2h-2.637c1.776,3.06,5.052,5,8.637,5,5.514,0,10-4.486,10-10Zm0-9l-.005,2.353C19.806,2.04,16.106,0,12,0,5.383,0,0,5.383,0,12h2C2,6.486,6.486,2,12,2c3.64,0,6.9,1.921,8.666,5h-2.666v2h3.991c1.107,0,2.009-.901,2.009-2.009v-3.991h-2Zm-5,14H7v-7.5c0-1.379,1.122-2.5,2.5-2.5h5c1.379,0,2.5,1.121,2.5,2.5v7.5Zm-2-7.5c0-.275-.225-.5-.5-.5h-5c-.276,0-.5.225-.5.5v5.5h6v-5.5Zm-4.5,2.5h3v-2h-3v2Z"
						/>
					</svg>
				</div>
				<div class="stat-title whitespace-normal font-semibold">
					Free returns and exchanges within 30 days
				</div>
			</div>
		</div>
	</div>
	<!-- End Experimental -->
	<div class="flex justify-center">
		<section
			class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
			style="background-image: url({caps});"
		>
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-center text-neutral-content">
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
			<div class="hero-content text-center text-neutral-content">
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
