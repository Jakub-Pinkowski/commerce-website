<script lang="ts">
	import MinusIcon from './icons/MinusIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';
</script>

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
