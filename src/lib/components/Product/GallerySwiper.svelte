<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';

	export let product;

	let isModalOpen: boolean = false;
	let selectedImage: string;

	const openModal = (imageSrc: string) => {
		selectedImage = imageSrc;
		isModalOpen = true;
	};

	const closeModal = () => {
		isModalOpen = false;
	};

	const initializeThumbSwiper = () => {
		return new Swiper('.swiper.thumb-image', {
			slidesPerView: 4.4,
			spaceBetween: 10,
			slideToClickedSlide: true,
			watchSlidesProgress: true,
			breakpoints: {
				768: {
					direction: 'vertical',
					slidesPerView: 7
				}
			}
		});
	};

	const initializeMainSwiper = (thumbSwiper: Swiper) => {
		new Swiper('.swiper.main-image', {
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
	};

	onMount(() => {
		// BUG: On safari mobile, all images on the carousels are way to high
		// BUG: On desktop when there are more than 7 images the whole carousel is way too high
		const thumbSwiper = initializeThumbSwiper();
		initializeMainSwiper(thumbSwiper);
	});
</script>

<div class="top-4 flex h-fit w-full flex-col md:sticky md:max-w-[55%] md:flex-row">
	<div class="swiper thumb-image order-2 w-full md:order-1 md:max-w-[15%]">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<img src={product.imageUrl} alt={product.name} class="h-full object-cover" loading="lazy" />
			</div>
			{#each product.alternateImages as alternateImage}
				<div class="swiper-slide">
					<img src={alternateImage} alt={product.name} class="h-full object-cover" loading="lazy" />
				</div>
			{/each}
		</div>
	</div>
	<div class="swiper main-image order-1 w-full max-w-full md:order-2 md:max-w-[85%]">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<button
					type="button"
					class="background-transparent cursor-zoom-in border-none p-0"
					on:click={() => openModal(product.imageUrl)}
					aria-label="Open image modal"
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
						aria-label="Open image modal"
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
			<button class="btn btn-circle bg-white shadow-xl" aria-label="Previous image">
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
			<button class="btn btn-circle bg-white shadow-xl" aria-label="Next image">
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
