<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';

	export let data: PageData;
	export let product = data?.product;
	let mainSwiper: Swiper;
	let thumbSwiper: Swiper;
	let smallInfoSwiper: Swiper;
	let quantity: number = 1;
	let isModalOpen = false;
	let selectedImage = '';
	let isOpenAccordion1 = false;
	let isOpenAccordion2 = false;

	function incrementQuantity() {
		quantity += 1;
	}

	function decrementQuantity() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}

	function openModal(imageSrc: string) {
		selectedImage = imageSrc;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	onMount(() => {
		thumbSwiper = new Swiper('.swiper.thumb-image', {
			direction: 'vertical',
			slidesPerView: 7,
			spaceBetween: 10,
			slideToClickedSlide: true,
			watchSlidesProgress: true
		});

		mainSwiper = new Swiper('.swiper.main-image', {
			slidesPerView: 1,
			loop: true,
			thumbs: {
				swiper: thumbSwiper
			},
			navigation: {
				nextEl: '.swiper.main-image .button-next',
				prevEl: '.swiper.main-image .button-prev',
				disabledClass: 'swiper-button-disabled'
			}
		});

		smallInfoSwiper = new Swiper('.swiper.info-carousel', {
			slidesPerView: 2.4,
			spaceBetween: 15,
			scrollbar: {
				el: '.swiper-scrollbar'
			}
		});
	});
</script>

{#if product}
	<section class="flex flex-col md:flex-row">
		<div class="flex h-fit w-full md:max-w-[55%]">
			<div class="swiper thumb-image p-2 md:max-w-[15%]">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src={product.imageUrl}
							alt={product.name}
							class="h-full object-cover"
							loading="lazy"
						/>
					</div>
					{#each product.alternateImages as alternateImage}
						<div class="swiper-slide">
							<img
								src={alternateImage}
								alt={product.name}
								class="h-full object-cover"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			</div>
			<div class="swiper main-image p-2 md:max-w-[85%]">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<button
							type="button"
							class="background-transparent cursor-zoom-in border-none p-0"
							on:click={() => openModal(product.imageUrl)}
						>
							<img src={product.imageUrl} alt={product.name} class="object-cover" loading="lazy" />
						</button>
					</div>
					{#each product.alternateImages as alternateImage}
						<div class="swiper-slide">
							<button
								type="button"
								class="background-transparent cursor-zoom-in border-none p-0"
								on:click={() => openModal(alternateImage)}
							>
								<img src={alternateImage} alt={product.name} class="object-cover" loading="lazy" />
							</button>
						</div>
					{/each}
				</div>
				<div class="swiper-pagination"></div>

				<div
					class="button-prev absolute left-8 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
				>
					<button class="btn btn-circle bg-white shadow-xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Outline"
							viewBox="0 0 24 24"
							width="36"
							height="36"
							><path
								d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"
							/></svg
						>
					</button>
				</div>
				<div
					class="button-next absolute right-8 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
				>
					<button class="btn btn-circle bg-white shadow-xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Outline"
							viewBox="0 0 24 24"
							width="36"
							height="36"
							><path
								d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"
							/></svg
						>
					</button>
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
					<span class="inline-block text-2xl text-main-red">${product.price}</span>
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
			<span class="mt-4 inline-block text-xl">
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
				<div class="collapse join-item collapse-arrow border border-base-300">
					<input type="checkbox" bind:checked={isOpenAccordion1} name="accordion-1" />
					<div class="collapse-title text-xl font-medium" class:text-secondary={isOpenAccordion1}>
						Materials and care
					</div>

					<!-- TODO: Add real materials info -->
					<div class="collapse-content">
						<h4 class="mt-4 text-lg font-semibold text-gray-800">Materials</h4>
						<p>
							This product is made from 100% organic cotton, sourced from sustainable farms. The
							dyes used are eco-friendly and water-based, ensuring minimal environmental impact.
						</p>
						<h4 class="mt-4 text-lg font-semibold text-gray-800">Care Instructions</h4>
						<p>
							To maintain the quality of your product, we recommend washing in cold water with like
							colors. Hang dry to preserve the fit and color. Iron on low heat if necessary. Avoid
							using bleach or harsh chemicals.
						</p>
					</div>
				</div>
				<div class="collapse join-item collapse-arrow border border-base-300">
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
			<!-- TODO: Some carousel can go here -->
			<div class="mt-8">
				<h4 class="mt-4 text-lg text-gray-800">You may also like</h4>
				<div class="swiper info-carousel mt-4">
					<div class="swiper-wrapper">
						<!-- NOTE: Those are kinda my other items now -->
						<div class="swiper-slide">
							<a href={product.url}>
								<img
									src={product.imageUrl}
									alt={product.name}
									class="h-full object-cover"
									loading="lazy"
								/>
							</a>

							<div class="pt-2">
								<a href={product.url}>
									<h3 class="text-lg font-semibold">Product name</h3>
								</a>
								<p class="text-base">Product brand</p>
								<p class="text-base">$99</p>
							</div>
						</div>
						{#each product.alternateImages as alternateImage}
							<div class="swiper-slide">
								<a href={product.url}>
									<img
										src={alternateImage}
										alt={product.name}
										class="h-full object-cover"
										loading="lazy"
									/>
								</a>
								<div class="pt-2">
									<a href={product.url}>
										<h3 class="text-lg font-semibold">Product name</h3>
									</a>
									<p class="text-base">Product brand</p>
									<p class="text-base">$99</p>
								</div>
							</div>
						{/each}
					</div>
					<div class="mt-4">
						<div class="swiper-scrollbar"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{#if isModalOpen}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black bg-opacity-50"
			on:click={closeModal}
			tabindex="-1"
			on:keydown={(event) => {
				if (event.key === 'Escape') closeModal();
			}}
			role="dialog"
			aria-modal="true"
			transition:fade={{ duration: 400, easing: quadOut }}
		>
			<img src={selectedImage} alt="Selected product" class="max-h-full max-w-full" />
		</div>
	{/if}
{:else}
	<h1 class="text-xl font-bold">No product found</h1>
{/if}

<style>
	/* Swiper */
	:global(.swiper.thumb-image .swiper-slide) {
		opacity: 0.4;
	}
	:global(.swiper.thumb-image .swiper-slide-thumb-active) {
		opacity: 1;
	}
</style>
