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
</script>

<div class="card flex w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
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
				<button class="btn btn-primary w-full md:w-auto" on:click={toggleEdit}>
					Save your info
				</button>
			{:else}
				<button class="btn btn-accent w-full md:w-auto" on:click={toggleEdit}>
					Edit your info
				</button>
			{/if}
		</div>
	</div>
</div>
