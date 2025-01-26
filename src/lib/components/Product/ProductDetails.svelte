<script lang="ts">
	import { fade } from 'svelte/transition';
	import { derived } from 'svelte/store';
	import 'swiper/css/bundle';

	import { addToCart } from '$lib/stores/cart';
	import { wishlist, toggleWishlist } from '$lib/stores/wishlist';
	import { openMiniCart } from '$lib/stores/miniCart';

	import type { Product } from '$lib/types/productTypes';

	let { product }: { product: Product } = $props();

	let quantity = $state(1);
	let isOpenAccordion1 = $state(false);
	let isOpenAccordion2 = $state(false);
	let toastCart = $state(false);
	let toastCartMessage = $state('');
	let toastWishlist = $state(false);
	let toastWishlistMessage = $state('');

	const incrementQuantity = () => {
		quantity += 1;
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			quantity -= 1;
		}
	};

	const handleAddToCart = () => {
		addToCart(product, quantity);
		toastCart = true;
		toastCartMessage = `<span class="font-bold">${product.name}</span> has been added to cart`;
		setTimeout(() => {
			toastCart = false;
		}, 2000);
		setTimeout(() => {
			openMiniCart();
		}, 400);
	};

	const isWishlisted = derived(wishlist, ($wishlist) =>
		$wishlist.some((item) => item.id === product.id)
	);

	const handleWishlistToggle = () => {
		toastWishlist = true;
		if ($isWishlisted) {
			toastWishlistMessage = `<span class="font-bold">${product.name}</span> has been removed from wishlist`;
		} else {
			toastWishlistMessage = `<span class="font-bold">${product.name}</span> has been added to wishlist`;
		}
		setTimeout(() => {
			toastWishlist = false;
		}, 2000);
		toggleWishlist(product);
	};
</script>

<div class="mt-4 w-full flex-none md:mt-0 md:max-w-[45%] md:p-8">
	<h1 class="text-3xl font-bold">{product.name}</h1>
	<span class="mt-4 inline-block text-lg">{product.brand}</span>
	<p class="mt-4 text-justify text-xl">{product.description}</p>
	<div class="mt-8">
		{#if product.price < product.listPrice}
			<span class="mr-2 inline-block text-2xl text-gray-500 line-through">
				${product.listPrice}
			</span>
			<span class="text-main-red inline-block text-2xl">${product.price}</span>
		{:else}
			<span class="inline-block text-2xl text-gray-500">${product.price}</span>
		{/if}
	</div>
	<div class="join mt-8">
		<button class="btn join-item text-2xl" onclick={decrementQuantity}>-</button>
		<span class="btn join-item cursor-default text-xl">{quantity}</span>
		<button class="btn join-item text-2xl" onclick={incrementQuantity}>+</button>
	</div>
	<div class="mt-8 grid w-full grid-cols-[1fr_auto] gap-x-4">
		<button class="btn btn-primary text-lg text-white" onclick={handleAddToCart}>
			Add to cart
		</button>
		<button class="btn" onclick={handleWishlistToggle}>
			{#if $isWishlisted}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Layer_1"
					data-name="Layer 1"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path
						d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="black"
				>
					<g id="_01_align_center" data-name="01 align center">
						<path
							d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
						/>
					</g>
				</svg>
			{/if}
		</button>
	</div>
	<span class="text-md mt-4 inline-block">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="Layer_1"
			data-name="Layer 1"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			class="mr-2 inline-block"
		>
			<path
				d="m24,10c0-2.757-2.243-5-5-5h-2v-1c0-1.654-1.346-3-3-3h-2v2h2c.552,0,1,.449,1,1v13H2v-4H0v6h2.037c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h6.074c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h2.037v-9ZM7,19.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm12-12.5c1.654,0,3,1.346,3,3v1h-5v-4h2Zm1,12.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm-3-2.5v-4h5v4h-5ZM10,3H0V1h10v2Zm-2,4H0v-2h8v2Zm-2,4H0v-2h6v2Z"
			/>
		</svg>Free shipping for all orders above $99
	</span>

	<!-- TODO: Add some real description to all products -->
	<p class="mt-4 text-justify text-lg">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat.
	</p>

	<div class="join join-vertical mt-12 w-full text-justify">
		<div class="join-item collapse-arrow border-base-300 collapse border">
			<input type="checkbox" bind:checked={isOpenAccordion1} name="accordion-1" />
			<div class="collapse-title text-xl font-medium" class:text-secondary={isOpenAccordion1}>
				Materials and care
			</div>

			<!-- TODO: Add real materials info -->
			<div class="collapse-content">
				<h4 class="mt-4 text-lg font-semibold text-gray-800">Materials</h4>
				<p>
					This product is made from 100% organic cotton, sourced from sustainable farms. The dyes
					used are eco-friendly and water-based, ensuring minimal environmental impact.
				</p>
				<h4 class="mt-4 text-lg font-semibold text-gray-800">Care Instructions</h4>
				<p>
					To maintain the quality of your product, we recommend washing in cold water with like
					colors. Hang dry to preserve the fit and color. Iron on low heat if necessary. Avoid using
					bleach or harsh chemicals.
				</p>
			</div>
		</div>
		<div class="join-item collapse-arrow border-base-300 collapse border">
			<input type="checkbox" bind:checked={isOpenAccordion2} name="accordion-1" />
			<div class="collapse-title text-xl font-medium" class:text-secondary={isOpenAccordion2}>
				Shipping and returns
			</div>
			<div class="collapse-content">
				<!-- TODO: Add real shipping info -->
				<h4 class="mt-4 text-lg font-semibold text-gray-800">Shipping</h4>
				<p>Regular shipping usually takes from 3 to 6 business days.</p>
				<h4 class="mt-4 text-lg font-semibold text-gray-800">Returns & Exchanges</h4>
				<p>You will have 30 days from the delivery date to request an exchange or a refund.</p>
			</div>
		</div>
	</div>
</div>
{#if toastCart}
	<div class="toast toast-center toast-top z-10" transition:fade>
		<div class="alert-add-to-cart alert">
			<span> {@html toastCartMessage}</span>
		</div>
	</div>
{/if}

{#if toastWishlist}
	<div class="toast toast-center toast-top z-10" transition:fade>
		<div class="alert-wishlist alert">
			<span> {@html toastWishlistMessage}</span>
		</div>
	</div>
{/if}
