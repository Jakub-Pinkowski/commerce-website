<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	export let value = '';
	export let id = '';
	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	export let autocomplete:
		| 'on'
		| 'off'
		| 'email'
		| 'username'
		| 'new-password'
		| 'current-password'
		| null
		| undefined = null;
	export let error = '';
	export let onFocus = () => {};
	export let onInput = () => {};
</script>

<div class="relative my-4 w-full">
	<label class="input input-bordered flex w-full items-center gap-2">
		<input
			class="grow"
			bind:value
			{id}
			{name}
			{type}
			{placeholder}
			{autocomplete}
			on:focus={onFocus}
			on:input={onInput}
		/>
	</label>
	{#if error}
		<div
			role="alert"
			class=" alert alert-warning absolute right-0 top-0 w-auto rounded border-none p-3"
			transition:fade={{ delay: 0, duration: 200, easing: quadOut }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<span>
				{error}
			</span>
		</div>
	{/if}
</div>

<style>
	.alert-warning {
		--alert-bg: var(--accent);
	}
</style>
