<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import FormInput from '$lib/components/Common/FormInput.svelte';
	import Google from '$lib/components/UI/login_buttons/Google.svelte';
	import Apple from '$lib/components/UI/login_buttons/Apple.svelte';
	import Facebook from '$lib/components/UI/login_buttons/Facebook.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Login'];

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

		const response = await fetch('/profile/login', {
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
		<a type="button" href="/profile/login/google" class=" btn btn-neutral w-full">
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				style="display: block;"
				class="s-gRndk_H0eBTb mr-2"
				width="20"
				height="20"
			>
				<path
					fill="#EA4335"
					d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
					class="s-gRndk_H0eBTb"
				>
				</path>
				<path
					fill="#4285F4"
					d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
					class="s-gRndk_H0eBTb"
				>
				</path>
				<path
					fill="#FBBC05"
					d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
					class="s-gRndk_H0eBTb"
				>
				</path>
				<path
					fill="#34A853"
					d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
					class="s-gRndk_H0eBTb"
				>
				</path>
				<path fill="none" d="M0 0h48v48H0z" class="s-gRndk_H0eBTb"> </path>
			</svg>
			Sign in with Google
		</a>
		<a type="button" href="/profile/login/github" class="btn btn-neutral w-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="currentColor"
				class="mr-2"
				viewBox="0 0 1792 1792"
			>
				<path
					d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"
				>
				</path>
			</svg>
			Sign in with GitHub
		</a>
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
			<a href="/profile/forgot-password" class="text-sm text-blue-500">Forgot password?</a>
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
				<a href="/profile/register" class="text-blue-500"> Register </a>
				instead
			</span>
		</div>
	</form>
</div>
