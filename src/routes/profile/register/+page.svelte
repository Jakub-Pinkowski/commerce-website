<script lang="ts">
	import { goto } from '$app/navigation';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import InputWithTooltip from '$lib/components/Common/InputWithTooltip.svelte';
	import FormInput from '$lib/components/Common/FormInput.svelte';

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

		console.log('response: ', response);
		const result = await response.json();
		console.log('result', result);

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
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,255}$/;

		if (!password) {
			passwordError = 'Password is required';
		} else if (password.length < passwordMinLength) {
			passwordError = `Password must be at least ${passwordMinLength} characters long`;
		} else if (password.length > passwordMaxLength) {
			passwordError = `Password must be no more than ${passwordMaxLength} characters long`;
		} else if (!passwordRegex.test(password)) {
			passwordError = 'Password not meeting the requirements';
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
	};

	const handlePasswordInteraction = () => {
		passwordError = '';
	};

	const handleRepeatPasswordInteraction = () => {
		repeatPasswordError = '';
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
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
			<ul class="list-disc pl-2 text-sm">
				<li>At least 8 characters long</li>
				<li>At least one uppercase letter</li>
				<li>At least one number</li>
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

		<button class="btn btn-primary mt-8 w-full" type="submit">Register</button>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/profile/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>
