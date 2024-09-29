<script lang="ts">
	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';

	export let user: User;
	console.log('user: ', user);

	let oldPassword: string = '';
	let newPassword: string = '';
	let repeatNewPassword: string = '';
	let oldPasswordError: string;
	let newPasswordError: string;
	let repeatNewPasswordError: string;
	let serverError: string;

	const handleOldPasswordInteraction = () => {
		oldPasswordError = '';
		serverError = '';
	};

	const handleNewPasswordInteraction = () => {
		newPasswordError = '';
		serverError = '';
	};

	const handleRepeatNewPasswordInteraction = () => {
		repeatNewPasswordError = '';
		serverError = '';
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Password</h2>
		<div class="flex-none overflow-x-auto p-1">
			<FormInput
				bind:value={oldPassword}
				id="password"
				name="password"
				type="password"
				placeholder="Old password*"
				autocomplete="current-password"
				error={oldPasswordError}
				onFocus={handleOldPasswordInteraction}
				onInput={handleOldPasswordInteraction}
			/>

			<FormInput
				bind:value={newPassword}
				id="new-password"
				name="new-password"
				type="password"
				placeholder="New password*"
				autocomplete="new-password"
				error={newPasswordError}
				onFocus={handleNewPasswordInteraction}
				onInput={handleNewPasswordInteraction}
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
				bind:value={repeatNewPassword}
				id="repeat-new-password"
				name="repeat-new-password"
				type="password"
				placeholder="Repeat new password*"
				autocomplete="new-password"
				error={repeatNewPasswordError}
				onFocus={handleRepeatNewPasswordInteraction}
				onInput={handleRepeatNewPasswordInteraction}
			/>
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="profile/settings" class="btn btn-accent w-full md:w-auto">Change your password</a>
		</div>
	</div>
</div>
