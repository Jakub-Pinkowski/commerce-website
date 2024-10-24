<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	let {
		value = $bindable(),
		id,
		name,
		placeholder,
		error = '',
		onFocus = () => {},
		onInput = () => {},
	}: {
		value: string;
		id: string;
		name: string;
		placeholder?: string;
		error?: string;
		onFocus?: () => void;
		onInput?: () => void;
	} = $props();
</script>

<textarea
	class="textarea textarea-bordered my-4 w-full gap-2 text-base"
	cols="30"
	rows="5"
	bind:value
	{id}
	{name}
	{placeholder}
	onfocus={onFocus}
	oninput={onInput}
>
</textarea>
