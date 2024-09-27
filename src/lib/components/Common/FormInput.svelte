<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	export let value: string;
	export let id: string;
	export let name: string;
	export let type: 'email' | 'password';
	export let placeholder;
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
	<label class="input input-bordered flex w-full items-center gap-2" class:input-warning={error}>
		{#if type === 'email'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
			>
				<path
					d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
				/>
				<path
					d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
				/>
			</svg>
		{:else if type === 'password'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
			>
				<path
					fill-rule="evenodd"
					d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
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
			class=" alert alert-warning absolute right-0 top-0 w-auto gap-2 rounded border-none p-3 text-sm text-whiteish"
			transition:fade={{ delay: 0, duration: 300, easing: quadOut }}
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
