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

		const result = await response.json();

		if (result.type === 'redirect') {
			goto(result.location);
		} else if (result.type === 'failure') {
			serverError = result.type;
		}
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Register</h1>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<div
			class="tooltip tooltip-left tooltip-error my-4 w-full"
			data-tip={emailError}
			class:tooltip-open={emailError}
		>
			<label class="input input-bordered flex w-full items-center gap-2">
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
		</div>
		<div
			class="tooltip tooltip-left tooltip-error my-4 w-full"
			data-tip={passwordError}
			class:tooltip-open={passwordError}
		>
			<label class="input input-bordered flex w-full items-center gap-2">
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
		</div>
		<div
			class="tooltip tooltip-left tooltip-error my-4 w-full"
			data-tip={repeatPasswordError}
			class:tooltip-open={repeatPasswordError}
		>
			<label class="input input-bordered flex w-full items-center gap-2">
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
		</div>

		<button class="btn btn-primary mt-8 w-full" type="submit">Register</button>
		<div class="mt-7 text-lg">
			<span>
				Already have an account? <a href="/profile/login" class="text-blue-500">Login</a> instead
			</span>
		</div>
	</form>
</div>

<style>
	.tooltip-error {
		--tooltip-color: var(--main-red);
		--tooltip-text-color: var(--whiteish);
	}

	.tooltip:has(:focus-visible):after,
	.tooltip:has(:focus-visible):before {
		opacity: 0;
	}
</style>
