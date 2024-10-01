<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';

	export let user: User;

	let name: string;
	let email: string;
	let phone: string;
	let nameError: string;
	let emailError: string;
	let phoneError: string;
	let serverError: string;
	let smallErrors: boolean = true;
	let smallLabels: boolean = true;
	let isEditing: boolean = false;

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

		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', phone);

		const response = await fetch('?/changeInfo', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();
		console.log('result: ', result);

		if (result.type === 'failure') {
			// NOTE: This is extremely wonky, hopefully when Svelte 5 releases it's going to be fixes
			const data = JSON.parse(result.data);
			const message = data[1];
			serverError = message;
		} else if (result.type === 'success') {
			// TODO: Show toast/alert when address was succesfully changed
			// TODO: Ideally I don't reload but pull the new instance of an user instead
			location.reload();
		}
	};

	const resetErrors = () => {
		nameError = '';
		emailError = '';
		phoneError = '';
		serverError = '';
	};

	const validateFields = () => {
		if (!name) {
			nameError = 'Name is required';
		}

		if (!email) {
			emailError = 'Email is required';
		}

		if (!phone) {
			phoneError = 'Phone is required';
		}

		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError = 'Invalid email';
		}

		if (phone && !/^\d{10}$/.test(phone)) {
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

	const handleEmailInteraction = () => {
		emailError = '';
		serverError = '';
	};

	const handlePhoneInteraction = () => {
		phoneError = '';
		serverError = '';
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<form on:submit={handleSubmit} class="card-body p-4 md:p-8">
		<h2 class="card-title">Your information</h2>
		<!-- TODO: Style later -->
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
									onFocus={handleNameInteraction}
									onInput={handleNameInteraction}
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
									onFocus={handleEmailInteraction}
									onInput={handleEmailInteraction}
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
					<tr>
						<th>Phone</th>
						{#if isEditing}
							<td class="pb-0 pr-0 pt-0">
								<FormInput
									bind:value={phone}
									id="phone"
									name="phone"
									type="tel"
									placeholder={user.phone_number || ''}
									autocomplete="tel"
									error={phoneError}
									onFocus={handlePhoneInteraction}
									onInput={handlePhoneInteraction}
									{smallErrors}
									{smallLabels}
								/>
							</td>
						{:else if user.phone_number}
							<td>{user.phone_number}</td>
						{:else}
							<td class="text-gray-400">No phone</td>
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
				<button type="button" class="btn w-full md:w-auto" on:click={toggleEdit}> Cancel </button>
				<button type="submit" class="btn btn-secondary w-full md:w-auto"> Save your info </button>
			</div>
		{:else}
			<div class="card-actions mt-auto justify-end pt-2">
				<button type="button" class="btn btn-accent w-full md:w-auto" on:click={toggleEdit}>
					Edit your info
				</button>
			</div>
		{/if}
	</form>
</div>
