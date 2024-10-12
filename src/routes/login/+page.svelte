<!-- TODO: Add a demo account with orders etc. -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import FormInput from '$lib/components/Common/FormInput.svelte';
	import GoogleButton from '$lib/components/UI/login_buttons/GoogleButton.svelte';
	import GithubButton from '$lib/components/UI/login_buttons/GithubButton.svelte';
	import DemoButton from '$lib/components/UI/login_buttons/DemoButton.svelte';

	let breadcrumbs = ['Home', 'Login'];

	let email: string;
	let password: string;
	let emailError: string;
	let passwordError: string;
	let serverError: string;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		resetErrors();
		validateFields();

		if (emailError || passwordError) {
			return;
		}

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		const response = await fetch('/login', {
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

		if (!password) {
			passwordError = 'Password is required';
		} else if (password.length < passwordMinLength) {
			passwordError = `Password must be at least ${passwordMinLength} characters long`;
		} else if (password.length > passwordMaxLength) {
			passwordError = `Password must be no more than ${passwordMaxLength} characters long`;
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
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-2xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Login</h1>
	<div class="mb-8 flex flex-col items-center gap-4">
		<GoogleButton />
		<GithubButton />
		<!-- <DemoButton /> -->
	</div>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<span>Sign in with Email</span>
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
		<div class="flex w-full justify-between pl-1">
			<a href="/login/forgot-password" class="text-sm text-blue-500">Forgot password?</a>
		</div>

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
		<button class="btn btn-primary mt-8 w-full" type="submit">Login</button>
		<div class="mt-7 text-lg">
			<span>
				Don't have an account?
				<a href="/register" class="text-blue-500"> Register </a>
				instead
			</span>
		</div>
	</form>
</div>
