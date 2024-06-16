<script lang="ts">
	import RemoveIcon from './icons/RemoveIcon.svelte';
	import MinusIcon from './icons/MinusIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';
</script>

<div class="relative flex py-6">
	<div class="absolute right-4 top-7">
		<RemoveIcon />
	</div>
	<div>
		<img src="https://picsum.photos/200/250" alt="random product" />
	</div>
	<div class="flex w-full flex-col">
		<div class="flex flex-col px-4">
			<span class="pr-8 text-xl">Random product name goes here</span>
			<span class="py-2 text-lg">XS</span>
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
