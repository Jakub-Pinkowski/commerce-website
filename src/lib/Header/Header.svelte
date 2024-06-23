<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { Hamburger } from 'svelte-hamburgers';

	import MobileMenu from './MobileMenu.svelte';
	import DesktopMenu from './DesktopMenu.svelte';
	import MiniCart from './MiniCart.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';

	let open: boolean = false;
	let openCart: boolean = false;

	const closeMenu = () => {
		open = false;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			open = !open;
		}
	};

	const toggleCartAndMenu = () => {
		closeMenu();
		openCart = !openCart;
	};
</script>

<header>
	<div class="navbar bg-base-100 px-4">
		<div class="navbar-start lg:hidden">
			<div class="btn btn-circle btn-ghost z-30 mx-1">
				<Hamburger bind:open --layer-width="30px" --layer-height="4px" --padding="0 15px" />
			</div>
			<SearchIcon {closeMenu} className="flex lg:hidden" />
			{#if open}
				<div
					class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-50"
					on:click={closeMenu}
					on:keydown={handleKeyDown}
					role="button"
					tabindex="0"
				></div>
				<div
					class="fixed left-0 top-0 z-20 h-full w-64 bg-white transition-transform duration-200 ease-in-out"
					transition:fly={{ x: -100, duration: 500, easing: quadOut }}
				>
					<MobileMenu {closeMenu} {toggleCartAndMenu} />
				</div>
			{/if}
		</div>
		<div class="navbar-start hidden lg:block">
			<a href="/" class="btn btn-ghost">Home</a>
			<a href="/categories" class="btn btn-ghost">Categories</a>
			<a href="/categories/new" class="btn btn-ghost">New</a>
			<a href="/categories/best_sellers" class="btn btn-ghost">Best Sellers</a>
			<a href="/categories/sale" class="btn btn-ghost">Sale</a>
		</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-xl">Logo</a>
		</div>
		<div class="navbar-end">
			<DesktopMenu {closeMenu} {toggleCartAndMenu} />
		</div>
	</div>
	<MiniCart {toggleCartAndMenu} {openCart} />
</header>
