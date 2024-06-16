<script lang="ts">
	import CloseIcon from './icons/CloseIcon.svelte';
	import MinusIcon from './icons/MinusIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';

	export let toggleCartAndMenu: () => void;
</script>

<div class="flex h-full flex-col">
	<div class="flex w-full items-center justify-between p-6">
		<span class=" text-3xl">Cart</span>
		<CloseIcon {toggleCartAndMenu} />
	</div>
	<div class="relative flex flex-col p-6">
		<div class="flex py-6">
			<div>
				<img src="https://picsum.photos/150/200" alt="random product" />
			</div>
			<div class="flex flex-col">
				<div class="flex flex-col p-2">
					<span class="p-2">Product Name</span>
					<span class="px-2">Size</span>
					<span class="p-2">$99</span>
				</div>
				<div class="flex p-2">
					<MinusIcon />
					<span class="px-4">1</span>
					<PlusIcon />
				</div>
			</div>
		</div>
		<div>Item 2</div>
	</div>
	<div class="mt-auto flex w-full flex-col items-center p-6">
		<button class="btn btn-neutral mt-8 w-full max-w-xl"> See the Cart </button>
		<button class="btn btn-primary mt-8 w-full max-w-xl"> Order </button>
	</div>
</div>
