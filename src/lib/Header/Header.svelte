<script lang="ts">
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

	const toggleCartAndMenu = () => {
		closeMenu();
		openCart = !openCart;
	};
</script>

<header class="navbar border-b bg-base-100 px-4">
	<div class="navbar-start lg:hidden">
		<div class="btn btn-circle btn-ghost z-30 mx-1">
			<Hamburger bind:open --layer-width="30px" --layer-height="4px" --padding="0 15px" />
		</div>
		<SearchIcon {closeMenu} className="flex lg:hidden" />

		<MobileMenu {closeMenu} {toggleCartAndMenu} {open} />
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
</header>
<MiniCart {toggleCartAndMenu} {openCart} />
