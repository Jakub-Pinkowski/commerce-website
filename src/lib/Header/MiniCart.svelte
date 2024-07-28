<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { closeMiniCart } from '$lib/stores/miniCart';
	import { cart } from '$lib/stores/cart';
	import type { CartItem } from '$lib/stores/cart';
    
	import CloseIcon from './icons/CloseIcon.svelte';
	import CartProductCard from './CartProductCard.svelte';

	export let isCartOpen: boolean = false;

	let items: CartItem[] = [];

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeMiniCart();
		}
	};

	const toggleBodyScroll = (isOpen: boolean) => {
		if (typeof window !== 'undefined') {
			if (typeof document !== 'undefined') {
				const body = document.body;
				if (isOpen) {
					body.classList.add('overflow-hidden');
				} else {
					body.classList.remove('overflow-hidden');
				}
			}
		}
	};

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
	$: {
		toggleBodyScroll(isCartOpen);
	}
</script>

{#if isCartOpen}
	<div
		class="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-50"
		on:click={closeMiniCart}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	></div>
	<div
		class="fixed right-0 top-0 z-40 h-full w-full bg-white transition-transform duration-200 ease-in-out lg:w-[30rem]"
		transition:fly={{ x: '150px', duration: 500, easing: quadOut }}
	>
		<div class="flex h-full flex-col">
			<div class="flex w-full items-center justify-between pl-4 pt-4">
				<span class=" text-3xl font-bold">Cart</span>
				<CloseIcon {closeMiniCart} />
			</div>
			<div class="relative flex w-full flex-col overflow-auto p-4">
				{#each items as item (item.id)}
					<div transition:fade={{ delay: 100 * item.id, easing: quadOut }}>
						<CartProductCard {item} />
					</div>
				{/each}
			</div>
			<div class="mt-auto flex w-full flex-col items-center p-4">
				<div class="flex w-full justify-between">
					<span class="text-lg">Total</span>
					<span class="text-lg text-gray-500">
						${total}
					</span>
				</div>
				<a href="/cart" class="btn btn-neutral mt-8 w-full max-w-xl"> See the cart </a>
				<a href="/cart/checkout" class="btn btn-primary mt-8 w-full max-w-xl"> Order </a>
			</div>
		</div>
	</div>
{/if}
