<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';
	import UserIcon from './icons/UserIcon.svelte';

	let open: boolean = false;

	const closeMenu = () => {
		open = false;
	};
</script>

<header>
	<div class="navbar bg-base-100 px-4">
		<div class="navbar-start lg:hidden">
			<div class="btn btn-circle btn-ghost z-30 mx-1">
				<Hamburger bind:open --layer-width="30px" --layer-height="4px" --padding="0 15px"
				></Hamburger>
			</div>
			<SearchIcon className="flex lg:hidden" />
			{#if open}
				<div
					class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-50"
					on:click={closeMenu}
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') closeMenu();
					}}
					role="button"
					tabindex="0"
				></div>
				<div
					class="fixed left-0 top-0 z-20 h-full w-64 bg-white transition-transform duration-200 ease-in-out"
					transition:fly={{ x: -100, duration: 500, easing: quadOut }}
				>
					<a href="/" class="btn btn-ghost absolute right-2.5 top-2.5 text-xl" on:click={closeMenu}
						>Logo</a
					>
					<div class="menu flex h-full flex-col bg-base-200 pt-20">
						<ul>
							<li>
								<a href="/categories" class="block p-4 text-lg" on:click={closeMenu}>Categories</a>
							</li>
							<li>
								<a href="/categories/new" class="block p-4 text-lg" on:click={closeMenu}>New</a>
							</li>
							<li>
								<a href="/categories/best_sellers" class="block p-4 text-lg" on:click={closeMenu}
									>Best Sellers</a
								>
							</li>
							<li>
								<a href="/categories/sale" class="block p-4 text-lg" on:click={closeMenu}>Sale</a>
							</li>
						</ul>
						<div class="mb-4 ml-4 mt-auto flex">
							<UserIcon />

							<LanguageIcon />
							<WishlistIcon />
							<CartIcon />
						</div>
					</div>
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
			<LanguageIcon className="hidden lg:flex" />
			<SearchIcon className="hidden lg:flex" />
			<UserIcon className="hidden lg:flex" />
			<WishlistIcon />
			<CartIcon />
		</div>
	</div>
</header>
