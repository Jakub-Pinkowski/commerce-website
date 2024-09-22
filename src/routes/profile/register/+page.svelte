<script lang="ts">
	import { enhance } from '$app/forms';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Register'];

	let email: string;
	let password: string;
	let repeatPassword: string;
	let emailError: string;
	let passwordError: string;
	let repeatPasswordError: string;
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form method="post" use:enhance class="mb-8 flex flex-col items-center">
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input
				bind:value={email}
				id="email"
				name="email"
				type="email"
				class="grow"
				placeholder="Email*"
			/>
		</label>
		{#if emailError}<span class="text-xs text-red-500">{emailError}</span>{/if}
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input
				bind:value={password}
				id="password"
				name="password"
				type="password"
				class="grow"
				placeholder="Password*"
			/>
		</label>
		{#if passwordError}<span class="text-xs text-red-500">{passwordError}</span>{/if}
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input
				bind:value={repeatPassword}
				id="repeatPassword"
				name="repeatPassword"
				type="password"
				class="grow"
				placeholder="Repeat password*"
			/>
		</label>
		{#if repeatPasswordError}<span class="text-xs text-red-500">{repeatPasswordError}</span>{/if}
		<button class="btn btn-primary mt-8 w-full" type="submit">Register</button>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/profile/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>
