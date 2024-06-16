<script lang="ts">
	import TrashIcon from './icons/TrashIcon.svelte';
	import MinusIcon from './icons/MinusIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';
</script>

<div class="flex py-6 relative">
	<div class="absolute right-2.5 top-5">
		<TrashIcon />
	</div>
	<div>
		<img src="https://picsum.photos/200/250" alt="random product" />
	</div>
	<div class="flex w-full flex-col">
		<div class="flex flex-col px-4">
			<span class="text-2xl">Product Name</span>
			<span class="text-xl">Size</span>
		</div>
		<div class="flex w-full justify-between p-4">
			<div class="flex items-center">
				<MinusIcon />
				<span class="px-4 text-lg">1</span>
				<PlusIcon />
			</div>
			<div>
				<span class="p-2 text-lg text-gray-500">$99</span>
			</div>
		</div>
	</div>
</div>
