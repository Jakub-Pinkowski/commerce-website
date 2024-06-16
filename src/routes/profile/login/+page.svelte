<script lang="ts">
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
	const isValidPassword = (value: string): boolean => {
		return true;
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

		if (emailError || passwordError) {
			return;
		}

		alert('Logged in');
	};
</script>

<div class="text-center">
	<h1 class="mb-8 text-5xl font-extrabold dark:text-white">Login</h1>
	<div class="mb-8 flex flex-col items-center">
		<button class="btn btn-outline mb-4 w-full max-w-xl">Sign in with Google</button>
		<button class="btn btn-outline mb-4 w-full max-w-xl">Sign in with Apple</button>
		<button class="btn btn-outline mb-4 w-full max-w-xl">Sign in with Facebook</button>
	</div>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<span>Login using Email</span>
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
		<button
			class="btn btn-primary mt-8 w-full max-w-xl"
			type="submit"
			disabled={formSubmitted && !isFormValid()}>Login</button
		>
		<div class="mt-7 text-lg">
			<span
				>Don't have an account? <a href="/profile/register" class="text-blue-500">Register</a> instead</span
			>
		</div>
	</form>
</div>
