<script lang="ts">
	import RemoveIcon from './icons/RemoveIcon.svelte';
</script>

<div class="relative flex border-b border-gray-300 py-6">
	<div class="absolute right-0 top-7">
		<RemoveIcon />
	</div>
	<div>
		<img src="https://picsum.photos/200/250" alt="random product" />
	</div>
	<div class="flex w-full flex-col">
		<div class="flex flex-col px-4">
			<a href="google.com">
				<h3 class=" text-lg line-clamp-2">Random name</h3>
			</a>
			<span class=" mt-2 line-clamp-1 block text-sm">Random brand</span>
		</div>
		<div class="mt-auto flex w-full justify-between pl-2">
			<div class="flex items-center">
				<div class="join">
					<button class="btn join-item h-10 min-h-10 text-lg">-</button>
					<span class="btn join-item h-10 min-h-10 cursor-default text-lg">1</span>
					<button class="btn join-item h-10 min-h-10 text-lg">+</button>
				</div>
			</div>
			<div class="flex items-center">
				<span class="p-0 text-lg text-gray-500">$99</span>
			</div>
		</div>
	</div>
</div>
