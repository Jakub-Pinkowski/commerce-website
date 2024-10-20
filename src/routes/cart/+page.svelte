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
</script>

<div>
	<Breadcrumbs {breadcrumbs} />

	<h1 class="text-3xl font-bold">Cart</h1>
</div>
