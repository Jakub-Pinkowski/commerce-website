<script lang="ts">
	import { onMount } from 'svelte';
	// TODO: Should lead to checkout, include recommendation carousel
	import { cart } from '$lib/stores/cart';
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import CartProductCard from '$lib/components/Header/CartProductCard.svelte';

	import type { CartItem } from '$lib/stores/cart';

	let breadcrumbs = ['Home', 'Cart'];
	let items: CartItem[] = [];

	onMount(() => {
		const unsubscribeCart = cart.subscribe((value) => {
			items = value;
		});

		return () => {
			document.body.classList.remove('overflow-hidden');
			unsubscribeCart();
		};
	});

	$: total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	$: totalListPrice = items.reduce((acc, item) => acc + item.listPrice * item.quantity, 0);
</script>

<div>
	<Breadcrumbs {breadcrumbs} />

	<h1 class="text-3xl font-bold">Cart</h1>
	{#if items.length === 0}
		<p>Your cart is empty.</p>
	{:else}
		<div class="flex flex-col gap-4 md:flex-row">
			<div class="md:w-[calc(50%-8px)]">
				<div>
					{#each items as item (item.id)}
						<CartProductCard {item} />
					{/each}
				</div>
			</div>
			<div class="divider divider-horizontal hidden md:flex"></div>
			<div class="flex flex-col gap-4 md:w-[calc(50%-8px)]">
				<div class="mt-6 flex w-full justify-between">
					<span class="text-lg">Total</span>
					<div>
						{#if totalListPrice > total}
							<span class="text-lg text-gray-500 line-through">
								${totalListPrice}
							</span>
						{/if}
						<span class="text-lg text-main-red">
							${total}
						</span>
					</div>
				</div>
				<div class="flex justify-end">
					<a href="/cart/checkout" class="btn btn-primary">Proceed to checkout</a>
				</div>
			</div>
		</div>
	{/if}
</div>
