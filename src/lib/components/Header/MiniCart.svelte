<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { closeMiniCart } from '$lib/stores/miniCart';
	import { cart } from '$lib/stores/cart';
	import CloseIcon from './icons/CloseIcon.svelte';
	import CartProductCard from '$lib/components/Header/CartProductCard.svelte';

	import type { CartItem } from '$lib/stores/cart';

	let { isCartOpen = false }: { isCartOpen: boolean } = $props();

	let items: CartItem[] = $state([]);

	const total = $derived.by(
		() => items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
	);

	const totalListPrice = $derived.by(
		() => items?.reduce((acc, item) => acc + item.listPrice * item.quantity, 0) || 0
	);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeMiniCart();
		}
	};

	const toggleBodyScroll = (isOpen: boolean) => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			document.body.classList.toggle('overflow-hidden', isOpen);
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

	$effect(() => {
		toggleBodyScroll(isCartOpen);
	});
</script>

{#if isCartOpen}
	<div
		class="fixed top-0 left-0 z-20 h-full w-full bg-black opacity-50"
		onclick={closeMiniCart}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
	></div>
	<div
		class="fixed top-0 right-0 z-40 h-full w-full bg-white transition-transform duration-200 ease-in-out md:w-[30rem]"
		transition:fly={{ x: '150px', duration: 500, easing: quadOut }}
	>
		<div class="flex h-full flex-col">
			<div class="flex w-full items-center justify-between pt-4 pl-4">
				<span class=" text-3xl font-bold">Cart</span>
				<CloseIcon {closeMiniCart} />
			</div>
			<div class="relative flex w-full flex-col overflow-auto p-4">
				{#each [...items].reverse() as item (item.id)}
					<div transition:fade={{ delay: 100 * item.id, easing: quadOut }}>
						<CartProductCard {item} />
					</div>
				{/each}
			</div>
			<div class="mt-auto flex w-full flex-col items-center p-4">
				<div class="flex w-full justify-between">
					<span class="text-lg">Total</span>
					<div>
						{#if totalListPrice > total}
							<span class="text-lg text-gray-500 line-through">
								${totalListPrice}
							</span>
						{/if}
						<span class="text-main-red text-lg">
							${total}
						</span>
					</div>
				</div>
				<a href="/cart" class="btn btn-neutral mt-8 w-full max-w-xl" onclick={closeMiniCart}>
					See the cart
				</a>
				<a
					href="/cart/checkout"
					class="btn btn-primary mt-8 w-full max-w-xl"
					onclick={closeMiniCart}
				>
					Order
				</a>
			</div>
		</div>
	</div>
{/if}
