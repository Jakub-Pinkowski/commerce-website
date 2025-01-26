<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import logo from '$lib/assets/images/logo.png';
	import UserIcon from './icons/UserIcon.svelte';
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';

	let {
		open,
		toggleCartAndMenu,
		closeMenu
	}: {
		open: boolean;
		toggleCartAndMenu: () => void;
		closeMenu: () => void;
	} = $props();

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			open = !open;
		}
	};

	const toggleBodyScroll = (isOpen: boolean) => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			document.body.classList.toggle('overflow-hidden', isOpen);
		}
	};

	$effect(() => {
		toggleBodyScroll(open);
	});
</script>

{#if open}
	<div
		class="fixed top-0 left-0 z-20 h-full w-full bg-black opacity-50"
		onclick={closeMenu}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
	></div>
	<div
		class="fixed top-0 left-0 z-20 h-[100vh] w-64 bg-white transition-transform duration-200 ease-in-out"
		transition:fly={{ x: -100, duration: 500, easing: quadOut }}
	>
		<a href="/" aria-label="Home" class="absolute top-2.5 right-2.5" onclick={closeMenu}>
			<img
				src={logo}
				alt="logo"
				class="h-12 max-h-12 transform rounded-lg transition-transform duration-300 hover:scale-105 md:hover:scale-105"
				style="max-height: 46px;"
			/>
		</a>
		<div class="menu bg-base-200 flex h-full flex-col pt-20">
			<ul>
				<li><a href="/categories" class="block p-4 text-lg" onclick={closeMenu}>Categories</a></li>
				<li><a href="/categories/new" class="block p-4 text-lg" onclick={closeMenu}>New</a></li>
				<li>
					<a href="/categories/best_sellers" class="block p-4 text-lg" onclick={closeMenu}>
						Best Sellers
					</a>
				</li>
				<li><a href="/categories/sale" class="block p-4 text-lg" onclick={closeMenu}>Sale</a></li>
				<li><a href="/products" class="block p-4 text-lg" onclick={closeMenu}>Shop All</a></li>
			</ul>
			<div class="mt-auto flex">
				<UserIcon {closeMenu} />
				<LanguageIcon {closeMenu} />
				<WishlistIcon {closeMenu} />
				<CartIcon {toggleCartAndMenu} />
			</div>
		</div>
	</div>
{/if}
