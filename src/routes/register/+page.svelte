<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import FormInput from '$lib/components/Common/FormInput.svelte';

	const breadcrumbs = ['Home', 'Register'];

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

		const response = await fetch('/register', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();

		if (result.type === 'redirect') {
			goto(result.location);
		} else if (result.type === 'failure') {
			// NOTE: This is extremely wonky, hopefully when Svelte 5 releases it's going to be fixes
			const data = JSON.parse(result.data);
			const message = data[1];
			serverError = message;
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
		const uppercaseRegex = /[A-Z]/;
		const numberRegex = /\d/;
		if (!password) {
			passwordError = 'Password is required';
		} else if (password.length < passwordMinLength) {
			passwordError = `Password must be at least ${passwordMinLength} characters long`;
		} else if (password.length > passwordMaxLength) {
			passwordError = `Password must be no more than ${passwordMaxLength} characters long`;
		} else if (!uppercaseRegex.test(password)) {
			passwordError = 'Password must contain at least 1 uppercase letter';
		} else if (!numberRegex.test(password)) {
			passwordError = 'Password must contain at least 1 number';
		}

		// Repeat password validation
		if (!repeatPassword) {
			repeatPasswordError = 'Repeat password is required';
		} else if (password !== repeatPassword) {
			repeatPasswordError = 'Passwords do not match';
		}
	};

	const handleEmailInteraction = () => {
		emailError = '';
		serverError = '';
	};

	const handlePasswordInteraction = () => {
		passwordError = '';
		serverError = '';
	};

	const handleRepeatPasswordInteraction = () => {
		repeatPasswordError = '';
		serverError = '';
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-2xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<FormInput
			bind:value={email}
			id="email"
			name="email"
			type="email"
			placeholder="Email*"
			autocomplete="email"
			error={emailError}
			onFocus={handleEmailInteraction}
			onInput={handleEmailInteraction}
		/>
		<FormInput
			bind:value={password}
			id="password"
			name="password"
			type="password"
			placeholder="Password*"
			autocomplete="new-password"
			error={passwordError}
			onFocus={handlePasswordInteraction}
			onInput={handlePasswordInteraction}
		/>
		<div role="alert" class="alert">
			<ul class="list-disc pl-2 text-left text-sm">
				<li>At least 8 characters long</li>
				<li>At least 1 uppercase letter</li>
				<li>At least 1 number</li>
				<li>Can include special characters @$!%*#?&</li>
			</ul>
		</div>
		<FormInput
			bind:value={repeatPassword}
			id="repeat-password"
			name="repeat-password"
			type="password"
			placeholder="Repeat password*"
			autocomplete="new-password"
			error={repeatPasswordError}
			onFocus={handleRepeatPasswordInteraction}
			onInput={handleRepeatPasswordInteraction}
		/>

		{#if serverError}
			<div
				role="alert"
				class="alert alert-warning mt-4 text-whiteish"
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
					{serverError}
				</span>
			</div>
		{/if}

		<button class="btn btn-primary mt-8 w-full" type="submit">Register</button>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>
