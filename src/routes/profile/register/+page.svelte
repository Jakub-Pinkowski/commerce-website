<script lang="ts">
	import { goto } from '$app/navigation';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import InputWithTooltip from '$lib/components/Common/InputWithTooltip.svelte';

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

		resetErrors();
		validateFields();

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

		const result = await response.json();

		if (result.type === 'redirect') {
			goto(result.location);
		} else if (result.type === 'failure') {
			serverError = result.type;
		}
	};

	const resetErrors = () => {
		emailError = '';
		passwordError = '';
		repeatPasswordError = '';
		serverError = '';
	};

	const validateFields = () => {
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
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<InputWithTooltip
			bind:value={email}
			id="email"
			name="email"
			type="email"
			placeholder="Email*"
			autocomplete="email"
			error={emailError}
		/>
		<InputWithTooltip
			bind:value={password}
			id="password"
			name="password"
			type="password"
			placeholder="Password*"
			autocomplete="new-password"
			error={passwordError}
		/>
		<InputWithTooltip
			bind:value={repeatPassword}
			id="repeatPassword"
			name="repeatPassword"
			type="password"
			placeholder="Repeat password*"
			autocomplete="new-password"
			error={repeatPasswordError}
		/>

		<button class="btn btn-primary mt-8 w-full" type="submit">Register</button>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/profile/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>
