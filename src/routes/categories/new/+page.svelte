<script lang="ts">
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';
	import products from '$lib/products/products.json';

	let swiper: Swiper;

	onMount(() => {
		swiper = new Swiper('.swiper', {
			slidesPerView: 4,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	});
</script>

<div>
	<h1>New</h1>
	<div class="mt-8">
		<div class="swiper">
			<div class="swiper-wrapper">
				{#each products as product}
					<div class="swiper-slide">
						<div class="bg-white p-4">
							<img
								src={product.imageUrl}
								alt={product.name}
								class=" w-full rounded-lg object-cover"
							/>
							<div class="mt-4">
								<span>{product.brand} </span>
								<h2 class="text-lg font-semibold text-gray-900">{product.name}</h2>
								{#if product.price < product.listPrice}
									<span class="text-gray-500 line-through">${product.listPrice}</span>
									<span class="text-red-500">${product.price}</span>
								{:else}
									<span class="mt-2 text-gray-600">Price: ${product.price}</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="swiper-pagination"></div>

			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
</div>
