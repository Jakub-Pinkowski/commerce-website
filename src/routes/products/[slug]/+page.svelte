<script lang="ts">
	import type { PageData } from './$types';
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';

	export let data: PageData;
	export let product = data?.product;
	let swiper: Swiper;
	let quantity: number = 1;

	function incrementQuantity() {
		quantity += 1;
	}

	function decrementQuantity() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}

	onMount(() => {
		swiper = new Swiper('.swiper', {
			slidesPerView: 1,
			spaceBetween: 10,
			navigation: {
				nextEl: '.button-next',
				prevEl: '.button-prev'
			}
		});
	});
</script>

{#if product}
	<section class="flex flex-col md:flex-row">
		<div class="w-full flex-none md:max-w-[55%]">
			<!-- TODO: Slider with thumbnails goes here -->
			<div></div>
			<div class="swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img src={product.imageUrl} alt={product.name} />
					</div>
					{#each product.alternateImages as alternateImage}
						<div class="swiper-slide">
							<img src={alternateImage} alt={product.name} />
						</div>
					{/each}
				</div>
				<div class="swiper-pagination"></div>

				<div
					class="button-prev absolute left-8 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="arrow-circle-down"
						viewBox="0 0 24 24"
						width="48"
						height="48"
					>
						<path
							d="M24,12A12,12,0,1,0,12,24,12.013,12.013,0,0,0,24,12ZM2,12A10,10,0,1,1,12,22,10.011,10.011,0,0,1,2,12Zm10.243,4.243-1.414,1.414L6.586,13.414a2,2,0,0,1,0-2.828l4.243-4.243,1.414,1.414L9,11h9v2H9Z"
						/>
					</svg>
				</div>
				<div
					class="button-next absolute right-8 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="arrow-circle-down"
						viewBox="0 0 24 24"
						width="48"
						height="48"
					>
						<path
							d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm22,0A10,10,0,1,1,12,2,10.011,10.011,0,0,1,22,12ZM11.757,7.757l1.414-1.414,4.243,4.243a2,2,0,0,1,0,2.828l-4.243,4.243-1.414-1.414L15,13H6V11h9Z"
						/>
					</svg>
				</div>
			</div>
		</div>
		<div class="w-full flex-none p-8 md:max-w-[45%]">
			<h1 class="text-3xl font-bold">{product.name}</h1>
			<span class="mt-4 inline-block text-lg">{product.brand}</span>
			<p class="mt-4 text-xl">{product.description}</p>
			{#if product.price < product.listPrice}
				<div class="mt-8">
					<span class="mr-2 inline-block text-2xl text-gray-500 line-through">
						${product.listPrice}
					</span>
					<span class="inline-block text-2xl text-red-600">${product.price}</span>
				</div>
			{:else}
				<div class="mt-8">
					<span class="inline-block text-2xl text-gray-500">${product.price}</span>
				</div>
			{/if}
			<div class="join mt-8">
				<button class="btn join-item text-2xl" on:click={decrementQuantity}>-</button>
				<span class="btn join-item cursor-default text-xl">{quantity}</span>
				<button class="btn join-item text-2xl" on:click={incrementQuantity}>+</button>
			</div>
			<div class="mt-8 grid w-full grid-cols-[1fr,auto] gap-x-4">
				<button class="btn btn-primary text-lg text-white"> Add to cart </button>
				<button class="btn text-lg">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<g id="_01_align_center" data-name="01 align center">
							<path
								d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
							/>
						</g>
					</svg>
				</button>
			</div>
		</div>
	</section>
{:else}
	<h1 class="text-xl font-bold">No product found</h1>
{/if}
