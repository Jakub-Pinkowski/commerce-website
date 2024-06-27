<script lang="ts">
	import Swiper from 'swiper/bundle';
	import { onMount } from 'svelte';
	import 'swiper/css/bundle';
	import items from '$lib/items/items.json';

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
		<!-- Slider main container -->
		<div class="swiper">
			<!-- Additional required wrapper -->
			<div class="swiper-wrapper">
				<!-- Slides -->
				{#each items as item}
					<div class="swiper-slide">
						<div class="bg-white p-4">
							<img
								src={item.imageUrl}
								alt={item.name}
								class="h-48 w-full rounded-lg object-cover"
							/>
							<div class="mt-4">
								<span>{item.brand} </span>
								<h2 class="text-lg font-semibold text-gray-900">{item.name}</h2>
								{#if item.price < item.listPrice}
									<span class="text-gray-500 line-through">${item.listPrice}</span>
									<span class="text-red-500">${item.price}</span>
								{:else}
									<span class="mt-2 text-gray-600">Price: ${item.price}</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<!-- If we need pagination -->
			<div class="swiper-pagination"></div>

			<!-- If we need navigation buttons -->
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
</div>
