<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import CloseIcon from './icons/CloseIcon.svelte';
	import CartProductCard from './CartProductCard.svelte';

	export let toggleCartAndMenu: () => void;
	export let openCart: boolean = false;

	let isMobile: boolean = false;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			openCart = !openCart;
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
		isMobile = window.innerWidth < 768;
		toggleBodyScroll(openCart);
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	});

	$: openCart, toggleBodyScroll(openCart);
</script>

{#if openCart}
	<div
		class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-50"
		on:click={toggleCartAndMenu}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	></div>
	<div
		class="fixed right-0 top-0 z-40 h-full w-full bg-white transition-transform duration-200 ease-in-out lg:w-[30rem]"
		transition:fly={isMobile
			? { y: 150, duration: 500, easing: quadOut }
			: { x: 150, duration: 500, easing: quadOut }}
	>
		<div class="flex h-full flex-col">
			<div class="flex w-full items-center justify-between pl-6 pr-2 pt-6 lg:p-6">
				<span class=" text-3xl font-bold">Cart</span>
				<CloseIcon {toggleCartAndMenu} />
			</div>
			<div class="relative flex w-full flex-col overflow-auto p-6">
				<CartProductCard />
				<CartProductCard />
				<CartProductCard />
			</div>
			<div class="mt-auto flex w-full flex-col items-center p-6">
				<div class="flex w-full justify-between">
					<span class="text-lg">Total</span>
					<span class="text-lg text-gray-500">$199</span>
				</div>
				<button class="btn btn-neutral mt-8 w-full max-w-xl"> See the Cart </button>
				<button class="btn btn-primary mt-8 w-full max-w-xl"> Order </button>
			</div>
		</div>
	</div>
{/if}
