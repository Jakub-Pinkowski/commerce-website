<script lang="ts">
	import { fade } from 'svelte/transition';
	import { derived } from 'svelte/store';

	import { addToCart } from '$lib/stores/cart';
	import { capitalizeWords } from '$lib/helpers/utils';
	import { wishlist, toggleWishlist } from '$lib/stores/wishlist';
	import { openMiniCart } from '$lib/stores/miniCart';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
    
	let quantity: number = 1;
	let toastCart: boolean = false;
	let toastCartMessage: string = '';
	let toastWishlist: boolean = false;
	let toastMessage: string = '';

	function handleAddToCart() {
		addToCart(product, quantity);
		toastCart = true;
		toastCartMessage = `<span class="font-bold">${product.name}</span> has been added to cart`;
		setTimeout(() => {
			toastCart = false;
		}, 2000);
		setTimeout(() => {
			openMiniCart();
		}, 400);
	}

	const isWishlisted = derived(wishlist, ($wishlist) =>
		$wishlist.some((item) => item.id === product.id)
	);

	const handleWishlistToggle = () => {
		toastWishlist = true;
		if ($isWishlisted) {
			toastMessage = `<span class="font-bold">${product.name}</span> has been removed from wishlist`;
		} else {
			toastMessage = `<span class="font-bold">${product.name}</span> has been added to wishlist`;
		}
		setTimeout(() => {
			toastWishlist = false;
		}, 2000);
		toggleWishlist(product);
	};
</script>

<div class="mb-4 md:mb-8">
	<a href={product.url} class="relative block w-full">
		{#if product.alternateImages.length > 0}
			<div class="group inset-0">
				<div class="relative h-full w-full">
					{#if product.price < product.listPrice}
						<div class="badge badge-lg absolute left-2 top-2 z-10 text-main-red">Sale</div>
					{:else if product.label && product.label.trim() !== ''}
						<div class="badge badge-lg absolute left-2 top-2 z-10 text-primary">
							{capitalizeWords(product.label)}
						</div>
					{/if}
					<img
						src={product.imageUrl}
						alt={product.name}
						class=" inset-0 block h-auto w-full object-cover opacity-100 md:group-hover:opacity-0"
					/>
					<img
						src={product.alternateImages[0]}
						alt={`Alternate view of ${product.name}`}
						class="absolute inset-0 hidden h-auto w-full object-cover opacity-0 md:block md:group-hover:opacity-100"
					/>
				</div>
			</div>
		{:else}
			<img src={product.imageUrl} alt={product.name} />
		{/if}
	</a>
	<div class="pt-2">
		<a href={product.url}>
			<h3 class="line-clamp-1">{product.name}</h3>
		</a>
		<span class="line-clamp-1 block text-sm">{product.brand}</span>
		<div class="mt-2 md:mt-4">
			{#if product.price < product.listPrice}
				<span class="mr-1 inline-block text-lg text-gray-500 line-through">
					${product.listPrice}
				</span>
				<span class="inline-block text-lg text-main-red">${product.price}</span>
			{:else}
				<span class="inline-block text-lg text-gray-500">${product.price}</span>
			{/if}
		</div>
		<div class="mt-4 hidden w-full grid-cols-[1fr,auto] gap-x-4 md:grid">
			<button class="btn btn-primary text-white" on:click={handleAddToCart}> Add to cart </button>
			<button class="btn" on:click={handleWishlistToggle}>
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
	<div class="toast toast-center toast-top z-20" transition:fade>
		<div class="alert-wishlist alert">
			<span> {@html toastMessage}</span>
		</div>
	</div>
{/if}
