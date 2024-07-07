<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';

	import MobileMenu from './MobileMenu.svelte';
	import DesktopMenu from './DesktopMenu.svelte';
	import MiniCart from './MiniCart.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';

	let open: boolean = false;
	let openCart: boolean = false;
	let productCategories = ['Shoes', 'Jackets', 'Pants'];
	let mainCategories = ['New', 'Sale', 'Best Sellers'];

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
		<!-- Experimental -->
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
		<!-- End experimental -->
		<a href="/categories/new" class="btn btn-ghost text-primary">New</a>

		<a href="/categories/sale" class="btn btn-ghost text-main-red">Sale</a>
		<a href="/categories/best_sellers" class="btn btn-ghost">Best Sellers</a>
		<a href="/products" class="btn btn-ghost">Shop All</a>
	</div>
	<div class="navbar-center">
		<a href="/" class="btn btn-ghost text-xl">Logo</a>
	</div>
	<div class="navbar-end">
		<DesktopMenu {closeMenu} {toggleCartAndMenu} />
	</div>
</header>
<MiniCart {toggleCartAndMenu} {openCart} />
