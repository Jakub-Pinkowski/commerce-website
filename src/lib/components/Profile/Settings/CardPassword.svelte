<script lang="ts">
	// TODO: Handle cases where user wants to change password but is logged in with Google or Github
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';

	let { user }: { user: User } = $props();

	const smallErrors: boolean = true;

	let oldPassword: string = $state('');
	let newPassword: string = $state('');
	let repeatNewPassword: string = $state('');
	let oldPasswordError: string = $state('');
	let newPasswordError: string = $state('');
	let repeatNewPasswordError: string = $state('');
	let serverError: string = $state('');
	let toastSuccess: boolean = $state(false);
	let toastSuccessMessage: string = $state('');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		resetErrors();
		validateFields();

		if (user.email === 'demo@demo.com') {
			serverError = 'You cannot change the information of the demo account';
			return;
		}

		if (oldPasswordError || newPasswordError || repeatNewPasswordError) {
			return;
		}

		const formData = new FormData();
		if (user.id) {
			formData.append('userId', user.id);
		} else {
			console.error('User ID is undefined');
			return;
		}
		formData.append('oldPassword', oldPassword);
		formData.append('newPassword', newPassword);

		const response = await fetch('?/changePassword', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();

		if (result.type === 'failure') {
			// NOTE: This is extremely wonky, hopefully when Svelte 5 releases it's going to be fixes
			const data = JSON.parse(result.data);
			const message = data[1];
			serverError = message;
		} else if (result.type === 'success') {
			toastSuccess = true;
			toastSuccessMessage = 'Your password has been updated';
			setTimeout(() => {
				toastSuccess = false;
			}, 2000);
		}
	};

	const resetErrors = () => {
		oldPasswordError = '';
		newPasswordError = '';
		repeatNewPasswordError = '';
		serverError = '';
	};

	const validateFields = () => {
		resetErrors();

		if (!oldPassword) {
			oldPasswordError = 'Old password is required';
		}

		if (!newPassword) {
			newPasswordError = 'New password is required';
		}

		if (!repeatNewPassword) {
			repeatNewPasswordError = 'Repeat new password is required';
		}

		if (newPassword !== repeatNewPassword) {
			repeatNewPasswordError = 'Passwords do not match';
		}

		const passwordMinLength = 8;
		const passwordMaxLength = 255;
		const uppercaseRegex = /[A-Z]/;
		const numberRegex = /\d/;

		if (newPassword.length < passwordMinLength) {
			newPasswordError = `Password must be at least ${passwordMinLength} characters long`;
		} else if (newPassword.length > passwordMaxLength) {
			newPasswordError = `Password must be no more than ${passwordMaxLength} characters long`;
		} else if (!uppercaseRegex.test(newPassword)) {
			newPasswordError = 'Password must contain at least 1 uppercase letter';
		} else if (!numberRegex.test(newPassword)) {
			newPasswordError = 'Password must contain at least 1 number';
		}
	};

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

<div class="card w-full bg-base-100 shadow-xl">
	<form onsubmit={handleSubmit} class="card-body p-4 md:p-8">
		<h2 class="card-title">Password</h2>
		<div class="flex-none overflow-x-auto p-1">
			<!-- Hidden username field for accessibility -->
			<input
				type="text"
				name="username"
				value="placeholder_username"
				hidden
				autocomplete="username"
			/>

			<FormInput
				bind:value={oldPassword}
				id="password"
				name="password"
				type="password"
				placeholder="Old password*"
				autocomplete="current-password"
				error={oldPasswordError}
				onfocus={handleOldPasswordInteraction}
				oninput={handleOldPasswordInteraction}
				{smallErrors}
			/>

			<FormInput
				bind:value={newPassword}
				id="new-password"
				name="new-password"
				type="password"
				placeholder="New password*"
				autocomplete="new-password"
				error={newPasswordError}
				onfocus={handleNewPasswordInteraction}
				oninput={handleNewPasswordInteraction}
				{smallErrors}
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
				onfocus={handleRepeatNewPasswordInteraction}
				oninput={handleRepeatNewPasswordInteraction}
				{smallErrors}
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
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<button class="btn btn-accent w-full md:w-auto">Change your password</button>
		</div>
	</form>
</div>
{#if toastSuccess}
	<div class="toast toast-center toast-top z-10" transition:fade>
		<div class="alert-add-to-cart alert">
			<span> {@html toastSuccessMessage}</span>
		</div>
	</div>
{/if}
