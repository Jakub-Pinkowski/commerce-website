<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import logo from '$lib/assets/images/logo.png';
	import UserIcon from './icons/UserIcon.svelte';
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';

	export let open: boolean = false;
	export let toggleCartAndMenu: () => void;
	export let closeMenu: () => void;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			open = !open;
		}
	};
</script>

{#if open}
	<div
		class="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-50"
		on:click={closeMenu}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	></div>
	<div
		class="fixed left-0 top-0 z-20 h-[100vh] w-64 bg-white transition-transform duration-200 ease-in-out"
		transition:fly={{ x: -100, duration: 500, easing: quadOut }}
	>
		<a href="/" aria-label="Home" class="absolute right-2.5 top-2.5" on:click={closeMenu}>
			<img
				src={logo}
				alt="logo"
				class="h-12 max-h-12 transform rounded-lg transition-transform duration-300 hover:scale-105 md:hover:scale-105"
				style="max-height: 46px;"
			/>
		</a>
		<div class="menu flex h-full flex-col bg-base-200 pt-20">
			<ul>
				<li><a href="/categories" class="block p-4 text-lg" on:click={closeMenu}>Categories</a></li>
				<li><a href="/categories/new" class="block p-4 text-lg" on:click={closeMenu}>New</a></li>
				<li>
					<a href="/categories/best_sellers" class="block p-4 text-lg" on:click={closeMenu}>
						Best Sellers
					</a>
				</li>
				<li><a href="/categories/sale" class="block p-4 text-lg" on:click={closeMenu}>Sale</a></li>
				<li><a href="/products" class="block p-4 text-lg" on:click={closeMenu}>Shop All</a></li>
			</ul>
			<div class="mb-4 ml-4 mt-auto flex">
				<UserIcon {closeMenu} />
				<LanguageIcon {closeMenu} />
				<WishlistIcon {closeMenu} />
				<CartIcon {toggleCartAndMenu} />
			</div>
		</div>
	</div>
{/if}
