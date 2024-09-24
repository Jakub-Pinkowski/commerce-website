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
		resetErrors();

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			emailError = 'Email is required';
		} else if (!emailRegex.test(email)) {
			emailError = 'Invalid email format';
		}

		// Password validation
		const passwordMinLength = 8;
		const passwordMaxLength = 255;
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,255}$/;

		if (!password) {
			passwordError = 'Password is required';
		} else if (password.length < passwordMinLength) {
			passwordError = `Password must be at least ${passwordMinLength} characters long`;
		} else if (password.length > passwordMaxLength) {
			passwordError = `Password must be no more than ${passwordMaxLength} characters long`;
		} else if (!passwordRegex.test(password)) {
			passwordError = 'Password must contain at least one uppercase letter and one number';
		}

		// Repeat password validation
		if (!repeatPassword) {
			repeatPasswordError = 'Repeat password is required';
		} else if (password !== repeatPassword) {
			repeatPasswordError = 'Passwords do not match';
		}
	};

	const handleInteraction = () => {
		resetErrors();
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form
		on:submit={handleSubmit}
		on:focus={handleInteraction}
		on:input={handleInteraction}
		class="mb-8 flex flex-col items-center"
	>
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
