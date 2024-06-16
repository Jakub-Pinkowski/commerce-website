<script lang="ts">
	import CloseIcon from './icons/CloseIcon.svelte';
    import CartProductCard from './CartProductCard.svelte';

	export let toggleCartAndMenu: () => void;
</script>

<div class="flex h-full flex-col">
	<div class="flex w-full items-center justify-between p-6">
		<span class=" text-3xl">Cart</span>
		<CloseIcon {toggleCartAndMenu} />
	</div>
	<div class="relative flex flex-col overflow-auto p-6">
        <CartProductCard />
        <CartProductCard />
	</div>
	<div class="mt-auto flex w-full flex-col items-center p-6">
		<button class="btn btn-neutral mt-8 w-full max-w-xl"> See the Cart </button>
		<button class="btn btn-primary mt-8 w-full max-w-xl"> Order </button>
	</div>
</div>
