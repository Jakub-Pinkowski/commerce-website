<script lang="ts">
	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';
	import type { Address } from '$lib/types/userTypes';

	export let user: User;

	let address: Address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	let addressErrors: Address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	let serverError: string;
	let smallErrors: boolean = true;
	let smallLabels: boolean = true;
	let isEditing: boolean = false;

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

	const handleInteraction = (field: AddressKey) => {
		addressErrors[field] = '';
		serverError = '';
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		resetErrors();
		validateFields();

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
		formData.append('street', address.street);
		formData.append('city', address.city);
		formData.append('state', address.state);
		formData.append('postalCode', address.postalCode);
		formData.append('country', address.country);

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
            // TODO: Show toast/alert when address was succesfully changed
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

		if (!address.street) {
			addressErrors.street = 'Street is required';
		}

		if (!address.city) {
			addressErrors.city = 'City is required';
		}

		if (!address.state) {
			addressErrors.state = 'State is required';
		}

		if (!address.postalCode) {
			addressErrors.postalCode = 'Postal code is required';
		}

		if (!address.country) {
			addressErrors.country = 'Country is required';
		}
	};
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<form on:submit={handleSubmit} class="card-body p-4 md:p-8">
		<h2 class="card-title">Address</h2>
		<!-- TODO: Style later -->
		<div class="flex-none overflow-x-auto">
			<table class="table">
				<tbody>
					{#each addressFields as { key, label, placeholder, autocomplete }}
						<tr>
							<th>{label}</th>
							{#if isEditing}
								<td class="pb-0 pt-0">
									<FormInput
										bind:value={address[key]}
										id={key}
										name={key}
										type="text"
										{placeholder}
										{autocomplete}
										error={addressErrors[key]}
										onFocus={() => handleInteraction(key)}
										onInput={() => handleInteraction(key)}
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
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			{#if isEditing}
				<button type="submit" class="btn btn-primary w-full md:w-auto"> Save your info </button>
			{:else}
				<button type="button" class="btn btn-accent w-full md:w-auto" on:click={toggleEdit}>
					Edit your info
				</button>
			{/if}
		</div>
	</form>
</div>
