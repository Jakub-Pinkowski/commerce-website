<script lang="ts">
	import { capitalizeFirstWord } from '$lib/helpers/functions';
    
	export let title: string;
	export let filters: Record<string, number>;
	export let handleToggle: (item: string) => void;
</script>

<div class="collapse join-item collapse-plus !rounded-none border-b border-base-300">
	<input type="checkbox" name={`my-accordion-${title}`} />
	<div class="collapse-title pl-1 text-lg font-medium">{title}</div>
	<div class="collapse-content pl-1">
		<div class="flex flex-col gap-2">
			{#each Object.entries(filters) as [filter, count]}
				<div class="flex items-center">
					<input
						type="checkbox"
						id={filter}
						value={filter}
						on:change={() => handleToggle(filter)}
						class="checkbox-primary checkbox h-4 w-4 rounded focus:ring-1 focus:ring-primary"
					/>
					<label for={filter} class="ml-3 text-sm text-gray-600">
						{capitalizeFirstWord(filter)} ({count})
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>
