<script lang="ts">
	import UserIcon from './icons/UserIcon.svelte';
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';

	export let toggleCartAndMenu: () => void;
	export let closeMenu: () => void;
</script>

<a href="/" class="btn btn-ghost absolute right-2.5 top-2.5 text-xl" on:click={closeMenu}>Logo</a>
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
	</ul>
	<div class="mb-4 ml-4 mt-auto flex">
		<UserIcon {closeMenu} />
		<LanguageIcon {closeMenu} />
		<WishlistIcon {closeMenu} />
		<CartIcon {toggleCartAndMenu} />
	</div>
</div>
