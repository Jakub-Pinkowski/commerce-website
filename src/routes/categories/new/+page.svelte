<script lang="ts">
	import { register } from 'swiper/element/bundle';
	import items from '$lib/items/items.json';
	register();

	const spaceBetween = 10;
</script>

<div>
	<h1>New</h1>
	<div class="mt-8">
		<swiper-container slides-per-view={3} centered-slides={true}>
			{#each items as item}
				<swiper-slide>
					<div class="card card-compact mb-4 w-96 bg-base-100 shadow-lg">
						<figure>
							<img src={item.imageUrl} alt={item.name} />
						</figure>
						<div class="card-body">
							<h2 class="card-title">{item.name}</h2>
							<span>${item.price}</span>
							<div class="card-actions justify-end">
								<button class="btn btn-primary">Add to Cart</button>
							</div>
						</div>
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</div>
