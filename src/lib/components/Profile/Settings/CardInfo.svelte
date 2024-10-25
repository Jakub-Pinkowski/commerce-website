<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';

	let { user }: { user: User } = $props();

    const smallErrors: boolean = true;
    const smallLabels: boolean = true;

	let name: string = $state('');
	let phone: string = $state('');
	let email: string = $state('');
	let nameError: string = $state('');
	let phoneError: string = $state('');
	let emailError: string = $state('');
	let serverError: string= $state('');
	let isEditing: boolean = $state(false);
	let toastSuccess: boolean = $state(false);
	let toastSuccessMessage: string = $state('');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		resetErrors();
		validateFields();

		if (nameError || emailError || phoneError) {
			return;
		}

		const formData = new FormData();
		if (user.id) {
			formData.append('userId', user.id);
		} else {
			console.error('User ID is undefined');
			return;
		}

		formData.append('name', name || user.name || '');
		formData.append('phone', phone || user.phone || '');
		formData.append('email', email || user.email || '');

		const response = await fetch('?/changeInfo', {
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
			toastSuccessMessage = 'Your information has been updated';
			setTimeout(() => {
				toastSuccess = false;
			}, 2000);

			// Update the user object with the new values
			user.name = name || user.name;
			user.phone = phone || user.phone;
			user.email = email || user.email;

			toggleEdit();
		}
	};

	const resetErrors = () => {
		nameError = '';
		emailError = '';
		phoneError = '';
		serverError = '';
	};

	const validateFields = () => {
		if (!name && !user.name) {
			nameError = 'Name is required';
		}

		if (!email && !user.email) {
			emailError = 'Email is required';
		}

		if (!phone && !user.phone) {
			phoneError = 'Phone is required';
		}

		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError = 'Invalid email';
		}

		if (phone && !/^\d{5,15}$/.test(phone)) {
			phoneError = 'Invalid phone number';
		}
	};

	const toggleEdit = () => {
		isEditing = !isEditing;
	};

	const handleNameInteraction = () => {
		nameError = '';
		serverError = '';
	};

	const handlePhoneInteraction = () => {
		phoneError = '';
		serverError = '';
	};

	const handleEmailInteraction = () => {
		emailError = '';
		serverError = '';
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<form onsubmit={handleSubmit} class="card-body p-4 md:p-8">
		<h2 class="card-title">Your information</h2>
		<div class="flex-none overflow-x-auto">
			<table class="table">
				<tbody>
					<tr>
						<th>Name</th>
						{#if isEditing}
							<td class="pb-0 pr-0 pt-0">
								<FormInput
									bind:value={name}
									id="name"
									name="name"
									type="text"
									placeholder={user.name || ''}
									autocomplete="name"
									error={nameError}
									onfocus={handleNameInteraction}
									oninput={handleNameInteraction}
									{smallErrors}
									{smallLabels}
								/>
							</td>
						{:else if user.name}
							<td>{user.name}</td>
						{:else}
							<td class="text-gray-400">No name</td>
						{/if}
					</tr>
					<tr>
						<th>Phone</th>
						{#if isEditing}
							<td class="pb-0 pr-0 pt-0">
								<FormInput
									bind:value={phone}
									id="phone"
									name="phone"
									type="tel"
									placeholder={user.phone || ''}
									autocomplete="tel"
									error={phoneError}
									onfocus={handlePhoneInteraction}
									oninput={handlePhoneInteraction}
									{smallErrors}
									{smallLabels}
								/>
							</td>
						{:else if user.phone}
							<td>{user.phone}</td>
						{:else}
							<td class="text-gray-400">No phone</td>
						{/if}
					</tr>
					<tr>
						<th>Email</th>
						{#if isEditing}
							<td class="pb-0 pr-0 pt-0">
								<FormInput
									bind:value={email}
									id="email"
									name="email"
									type="email"
									placeholder={user.email || ''}
									autocomplete="email"
									error={emailError}
									onfocus={handleEmailInteraction}
									oninput={handleEmailInteraction}
									{smallErrors}
									{smallLabels}
								/>
							</td>
						{:else if user.email}
							<td>{user.email}</td>
						{:else}
							<td class="text-gray-400">No email</td>
						{/if}
					</tr>
				</tbody>
			</table>
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
		{#if isEditing}
			<div class="card-actions mt-auto justify-between pt-2">
				<button type="button" class="btn w-full md:w-auto" onclick={toggleEdit}> Cancel </button>
				<button type="submit" class="btn btn-secondary w-full md:w-auto"> Save your info </button>
			</div>
		{:else}
			<div class="card-actions mt-auto justify-end pt-2">
				<button type="button" class="btn btn-accent w-full md:w-auto" onclick={toggleEdit}>
					Edit your info
				</button>
			</div>
		{/if}
	</form>
</div>

{#if toastSuccess}
	<div class="toast toast-center toast-top z-10" transition:fade>
		<div class="alert-add-to-cart alert">
			<span> {@html toastSuccessMessage}</span>
		</div>
	</div>
{/if}
