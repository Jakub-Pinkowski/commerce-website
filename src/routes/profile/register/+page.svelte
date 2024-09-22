<script lang="ts">
	import { goto } from '$app/navigation';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Register'];

	let email: string;
	let password: string;
	let repeatPassword: string;
	let emailError: string;
	let passwordError: string;
	let repeatPasswordError: string;
	let serverError: string;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		emailError = '';
		passwordError = '';
		repeatPasswordError = '';
		serverError = '';

		if (!email) {
			emailError = 'Email is required';
		}

		if (!password) {
			passwordError = 'Password is required';
		}

		if (!repeatPassword) {
			repeatPasswordError = 'Repeat password is required';
		} else if (password !== repeatPassword) {
			repeatPasswordError = 'Passwords do not match';
		}

		if (emailError || passwordError || repeatPasswordError) {
			return;
		}

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		const response = await fetch('/profile/register', {
			method: 'POST',
			body: formData
		});

		console.log('response', response);
		const result = await response.json();
		console.log('result', result);

		if (result.type === 'redirect') {
			goto(result.location);
		}
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input
				bind:value={email}
				id="email"
				name="email"
				type="email"
				class="grow"
				placeholder="Email*"
				autocomplete="email"
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
				autocomplete="new-password"
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
				autocomplete="new-password"
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
