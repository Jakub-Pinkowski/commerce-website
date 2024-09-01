<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Hamburger } from 'svelte-hamburgers';

	import { isMiniCartOpen, toggleMiniCart } from '$lib/stores/miniCart';

	import MobileMenu from './MobileMenu.svelte';
	import MiniCart from './MiniCart.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';
	import UserIcon from './icons/UserIcon.svelte';
	import logo from '$lib/assets/images/logo.png';

	let open: boolean = false;
	let productCategories = ['Shoes', 'Backpacks', 'Caps', 'Bikes'];
	let mainCategories = ['New', 'Sale', 'Best Sellers'];

	const closeMenu = () => {
		open = false;
	};

	const toggleCartAndMenu = () => {
		closeMenu();
		toggleMiniCart();
	};

	let isCartOpen: boolean;
	const unsubscribe = isMiniCartOpen.subscribe((value) => {
		isCartOpen = value;
	});

	onDestroy(() => {
		unsubscribe();
	});
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
		<div class="dropdown dropdown-hover">
			<a href="/categories" tabindex="0" role="button" class="btn btn-ghost">Categories</a>
			<div
				tabindex="-1"
				class="menu dropdown-content z-[1] flex w-96 flex-row rounded-box bg-base-100 p-2 shadow"
			>
				<ul class="w-[calc(50%-8px)] p-2">
					{#each productCategories as category}
						<li>
							<a href="/categories/{category.toLowerCase()}">{category}</a>
						</li>
					{/each}
				</ul>
				<div class="divider divider-horizontal mx-0 p-2"></div>
				<ul class="w-[calc(50%-8px)] p-2">
					{#each mainCategories as category}
						<li>
							<a href="/categories/{category.replace(/\s+/g, '_').toLowerCase()}">{category}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<a href="/categories/new" class="btn btn-ghost text-primary">New</a>

		<a href="/categories/sale" class="btn btn-ghost text-main-red">Sale</a>
		<a href="/categories/best_sellers" class="btn btn-ghost">Best Sellers</a>
		<a href="/products" class="btn btn-ghost">Shop All</a>
	</div>
	<div class="navbar-center">
		<a href="/">
			<img
				src={logo}
				alt="logo"
				class="h-12 max-h-12 transform rounded-lg transition-transform duration-300 hover:scale-105 md:hover:scale-105"
				style="max-height: 46px;"
			/>
		</a>
	</div>
	<div class="navbar-end">
		<SearchIcon {closeMenu} className="hidden lg:flex" />
		<UserIcon {closeMenu} className="hidden lg:flex" />
		<WishlistIcon {closeMenu} />
		<CartIcon {toggleCartAndMenu} />
	</div>
</header>
<MiniCart {isCartOpen} />
