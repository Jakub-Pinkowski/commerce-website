<script lang="ts">
	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';

	export let user;
	console.log('user: ', user);

	let password = '';
	let repeatPassword = '';
	let passwordError: string;
	let repeatPasswordError: string;
	let serverError: string;

	const handlePasswordInteraction = () => {
		passwordError = '';
		serverError = '';
	};

	const handleRepeatPasswordInteraction = () => {
		repeatPasswordError = '';
		serverError = '';
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Password</h2>
		<!-- TODO: Style later -->
		<div class="flex-none overflow-x-auto">
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
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="profile/settings" class="btn btn-accent w-full md:w-auto">Change your password</a>
		</div>
	</div>
</div>
