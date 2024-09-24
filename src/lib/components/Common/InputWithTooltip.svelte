<script lang="ts">
	export let value = '';
	export let id = '';
	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	export let autocomplete = '';
	export let error = '';
</script>

<div
	class="tooltip tooltip-left tooltip-error my-4 w-full"
	data-tip={error}
	class:tooltip-open={error}
>
	<label class="input input-bordered flex w-full items-center gap-2">
		<input bind:value {id} {name} {type} class="grow" {placeholder} {autocomplete} />
	</label>
</div>

<style>
	/* FIXME: Sometimes when removing errors the small tooltip without text remains for a split of a second */
	.tooltip-error {
		--tooltip-color: var(--main-red);
		--tooltip-text-color: var(--whiteish);
	}

    .tooltip:before,
    .tooltip:after {
        transition-delay: 0ms;
        transition-duration: 0ms;
    }

	.tooltip:has(:focus-visible):before,
	.tooltip:has(:focus-visible):after,
	.tooltip:hover:before,
	.tooltip:hover:after {
		opacity: 0;
        transition-delay: 0ms;
        transition-duration: 20ms;
	}
</style>
