<script lang="ts">
	import LanguageIcon from './icons/LanguageIcon.svelte';
	import WishlistIcon from './icons/WishlistIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import CartIcon from './icons/CartIcon.svelte';
	import UserIcon from './icons/UserIcon.svelte';

	export let closeMenu: () => void;
	export let toggleCartAndMenu: () => void;
</script>

<LanguageIcon {closeMenu} className="hidden lg:flex" />
<SearchIcon {closeMenu} className="hidden lg:flex" />
<UserIcon {closeMenu} className="hidden lg:flex" />
<WishlistIcon {closeMenu} />
<CartIcon {toggleCartAndMenu} />
