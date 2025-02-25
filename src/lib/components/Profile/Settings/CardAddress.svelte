<script lang="ts">
	// TODO: Add dropdowns for country and state
	// TODO: Add google maps integration for address
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';
	import type { Address } from '$lib/types/userTypes';

	let { user }: { user: User } = $props();

	let address: Address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	let addressErrors: Address = $state({
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	});

	const smallErrors: boolean = true;
	const smallLabels: boolean = true;

	let serverError: string = $state('');
	let isEditing: boolean = $state(false);
	let toastSuccess: boolean = $state(false);
	let toastSuccessMessage: string = $state('');

	const addressFields: {
		key: AddressKey;
		label: string;
		placeholder: string;
		autocomplete:
			| 'on'
			| 'off'
			| 'email'
			| 'username'
			| 'new-password'
			| 'current-password'
			| 'street-address'
			| 'address-line1'
			| 'address-line2'
			| 'address-level1'
			| 'postal-code'
			| 'country'
			| null
			| undefined;
	}[] = [
		{
			key: 'street',
			label: 'Street',
			placeholder: user.address?.street ?? '',
			autocomplete: 'street-address'
		},
		{
			key: 'city',
			label: 'City',
			placeholder: user.address?.city ?? '',
			autocomplete: 'address-line2'
		},
		{
			key: 'state',
			label: 'State',
			placeholder: user.address?.state ?? '',
			autocomplete: 'address-level1'
		},
		{
			key: 'postalCode',
			label: 'Postal Code',
			placeholder: user.address?.postalCode ?? '',
			autocomplete: 'postal-code'
		},
		{
			key: 'country',
			label: 'Country',
			placeholder: user.address?.country ?? '',
			autocomplete: 'country'
		}
	];

	const toggleEdit = () => {
		isEditing = !isEditing;
	};

	type AddressKey = keyof Address;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		resetErrors();
		validateFields();

		if (user.email === 'demo@demo.com') {
			serverError = 'You cannot change the information of the demo account';
			return;
		}

		if (
			addressErrors.street ||
			addressErrors.city ||
			addressErrors.state ||
			addressErrors.postalCode ||
			addressErrors.country
		) {
			return;
		}

		const formData = new FormData();
		if (user.id) {
			formData.append('userId', user.id);
		} else {
			console.error('User ID is undefined');
			return;
		}

		// Use existing values from user.address if fields are empty
		formData.append('street', address.street || user.address?.street || '');
		formData.append('city', address.city || user.address?.city || '');
		formData.append('state', address.state || user.address?.state || '');
		formData.append('postalCode', address.postalCode || user.address?.postalCode || '');
		formData.append('country', address.country || user.address?.country || '');

		const response = await fetch('?/changeAddress', {
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
			toastSuccess = true;
			toastSuccessMessage = 'Your information has been updated';
			setTimeout(() => {
				toastSuccess = false;
			}, 2000);

			// Update the user object with the new values
			user.address = {
				street: address.street || user.address?.street || '',
				city: address.city || user.address?.city || '',
				state: address.state || user.address?.state || '',
				postalCode: address.postalCode || user.address?.postalCode || '',
				country: address.country || user.address?.country || ''
			};

			toggleEdit();
		}
	};

	const resetErrors = () => {
		addressErrors = {
			street: '',
			city: '',
			state: '',
			postalCode: '',
			country: ''
		};
		serverError = '';
	};

	const validateFields = () => {
		resetErrors();

		if (address.street && (address.street.length < 3 || address.street.length > 255)) {
			addressErrors.street = 'Street must be between 3 and 255 characters';
		}

		if (address.city && (address.city.length < 3 || address.city.length > 255)) {
			addressErrors.city = 'City must be between 3 and 255 characters';
		}

		if (address.state && (address.state.length < 3 || address.state.length > 255)) {
			addressErrors.state = 'State must be between 3 and 255 characters';
		}

		if (address.postalCode && (address.postalCode.length < 3 || address.postalCode.length > 255)) {
			addressErrors.postalCode = 'Postal code must be between 3 and 255 characters';
		}

		if (address.country && (address.country.length < 3 || address.country.length > 255)) {
			addressErrors.country = 'Country must be between 3 and 255 characters';
		}

		if (
			address.street === user.address?.street &&
			address.city === user.address?.city &&
			address.state === user.address?.state &&
			address.postalCode === user.address?.postalCode &&
			address.country === user.address?.country
		) {
			serverError = 'No changes were made';
		}
	};

	const handleInteraction = (field: AddressKey) => {
		addressErrors[field] = '';
		serverError = '';
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<form onsubmit={handleSubmit} class="card-body p-4 md:p-8">
		<h2 class="card-title">Address</h2>
		<div class="flex-none overflow-x-auto">
			<table class="table">
				<tbody>
					{#each addressFields as { key, label, placeholder, autocomplete }}
						<tr>
							<th>{label}</th>
							{#if isEditing}
								<td class="pb-0 pr-0 pt-0">
									<FormInput
										bind:value={address[key]}
										id={key}
										name={key}
										type="text"
										{placeholder}
										{autocomplete}
										error={addressErrors[key]}
										onfocus={() => handleInteraction(key)}
										oninput={() => handleInteraction(key)}
										{smallErrors}
										{smallLabels}
									/>
								</td>
							{:else if user.address?.[key]}
								<td>{user.address[key]}</td>
							{:else}
								<td class="text-gray-400">No {label.toLowerCase()}</td>
							{/if}
						</tr>
					{/each}
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
