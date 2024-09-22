<script lang="ts">
	// TODO: Refactor the whole logic here, leave the design
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	import Google from '$lib/components/UI/login_buttons/Google.svelte';
	import Apple from '$lib/components/UI/login_buttons/Apple.svelte';
	import Facebook from '$lib/components/UI/login_buttons/Facebook.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Register'];

	let email: string;
	let password: string;
	let emailError: string;
	let passwordError: string;
	let formSubmitted: boolean = false;

	// TODO: Check if email is in the database
	const isValidEmail = (value: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	// TODO: Check if password matches the email
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-extrabold">Login</h1>
	<div class="mb-8 flex flex-col items-center gap-4">
		<Google />
		<Apple />
		<Facebook />
	</div>
	<form class="mb-8 flex flex-col items-center">
		<span>Sign in with Email</span>
		<label class="input input-bordered my-4 flex w-full max-w-xl items-center gap-2">
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
		<label class="input input-bordered my-4 flex w-full max-w-xl items-center gap-2">
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
		<div class="flex w-full max-w-xl justify-between">
			<label class="inline-flex items-center">
				<span class="ml-2">Remember me</span>
				<input type="checkbox" class="form-checkbox mx-2" name="rememberMe" />
			</label>
			<a href="/profile/forgot-password" class="text-blue-500">Forgot password?</a>
		</div>
		<button class="btn btn-primary mt-8 w-full max-w-xl" type="submit">Login</button>
		<div class="mt-7 text-lg">
			<span
				>Don't have an account? <a href="/profile/register" class="text-blue-500">Register</a> instead</span
			>
		</div>
	</form>
</div>
