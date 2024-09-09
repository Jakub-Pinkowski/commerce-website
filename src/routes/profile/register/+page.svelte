<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Register'];

	let email: string;
	let password: string;
	let repeatPassword: string;
	let emailError: string;
	let passwordError: string;
	let repeatPasswordError: string;
	let formSubmitted: boolean = false;

	const isValidEmail = (value: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	// TODO: Implement real password validation
	const isValidPassword = (value: string): boolean => {
		return true;
	};

	const isValidRepeatPassword = (value: string): boolean => {
		return password === value;
	};

	const isFormValid = (): boolean => {
		return Boolean(email && password);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		formSubmitted = true;

		if (!email) {
			emailError = 'Please enter your email';
		} else if (!isValidEmail(email)) {
			emailError = 'Please enter a valid email';
		}

		if (!password) {
			passwordError = 'Please enter your password';
		} else if (!isValidPassword(password)) {
			passwordError = 'Please enter a valid password';
		}

		if (!repeatPassword) {
			repeatPasswordError = 'Please repeat your password';
		} else if (!isValidRepeatPassword(repeatPassword)) {
			repeatPasswordError = 'Passwords do not match';
		}

		if (emailError || passwordError || repeatPasswordError) {
			return;
		}

		alert('Registered in');
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
		<button
			class="btn btn-primary mt-8 w-full"
			type="submit"
			disabled={formSubmitted && !isFormValid()}>Register</button
		>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/profile/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>
