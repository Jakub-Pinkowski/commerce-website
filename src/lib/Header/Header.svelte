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

	let open: boolean = false;
	let productCategories = ['Shoes', 'Jackets', 'Pants'];
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
				<ul class="w-1/2 p-2">
					{#each productCategories as category}
						<li>
							<a href="/categories/{category.toLowerCase()}">{category}</a>
						</li>
					{/each}
				</ul>
				<ul class="w-1/2 p-2">
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
		<a href="/" class="btn btn-ghost text-xl">Logo</a>
	</div>
	<div class="navbar-end">
        <!-- TODO: Implement search experience, different for desktop and mobile -->
		<!-- <label class=" input input-bordered hidden items-center gap-2 lg:flex">
			<input type="text" class="grow" placeholder="Search" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-8 w-8 opacity-70"
			>
				<path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/>
			</svg>
		</label> -->
		<SearchIcon {closeMenu} className="hidden lg:flex" />
		<UserIcon {closeMenu} className="hidden lg:flex" />
		<WishlistIcon {closeMenu} />
		<CartIcon {toggleCartAndMenu} />
	</div>
</header>
<MiniCart {isCartOpen} />
