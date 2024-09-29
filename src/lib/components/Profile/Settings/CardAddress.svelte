<script lang="ts">
	import FormInput from '$lib/components/Common/FormInput.svelte';

	import type { User } from '$lib/types/userTypes';
    import type {Address} from '$lib/types/userTypes';

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
	let isEditing: boolean = false;

	const toggleEdit = () => {
		isEditing = !isEditing;
	};

	const handleStreetInteraction = () => {
		addressErrors.street = '';
		serverError = '';
	};

	const handleCityInteraction = () => {
		addressErrors.city = '';
		serverError = '';
	};

	const handleStateInteraction = () => {
		addressErrors.state = '';
		serverError = '';
	};

	const handlePostalCodeInteraction = () => {
		addressErrors.postalCode = '';
		serverError = '';
	};

	const handleCountryInteraction = () => {
		addressErrors.country = '';
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
					<tr>
						<th>Street</th>
						{#if isEditing}
							<td>
								<FormInput
									bind:value={address.street}
									id="street"
									name="street"
									type="text"
									placeholder={user.address?.street ?? ''}
									autocomplete="street-address"
									error={addressErrors.street}
									onFocus={handleStreetInteraction}
									onInput={handleStreetInteraction}
									{smallErrors}
								/>
							</td>
						{:else if user.address?.street}
							<td>{user.address.street}</td>
						{:else}
							<td class="text-gray-400">No street</td>
						{/if}
					</tr>
					<tr>
						<th>City</th>
						{#if isEditing}
							<td>
								<FormInput
									bind:value={address.city}
									id="city"
									name="city"
									type="text"
									placeholder={user.address?.city ?? ''}
									autocomplete="address-line2"
									error={addressErrors.city}
									onFocus={handleCityInteraction}
									onInput={handleCityInteraction}
									{smallErrors}
								/>
							</td>
						{:else if user.address?.city}
							<td>{user.address.city}</td>
						{:else}
							<td class="text-gray-400">No city</td>
						{/if}
					</tr>
					<tr>
						<th>State</th>
						{#if isEditing}
							<td>
								<FormInput
									bind:value={address.state}
									id="state"
									name="state"
									type="text"
									placeholder={user.address?.state ?? ''}
									autocomplete="address-level1"
									error={addressErrors.state}
									onFocus={handleStateInteraction}
									onInput={handleStateInteraction}
									{smallErrors}
								/>
							</td>
						{:else if user.address?.state}
							<td>{user.address.state}</td>
						{:else}
							<td class="text-gray-400">No state</td>
						{/if}
					</tr>
					<tr>
						<th>Postal Code</th>
						{#if isEditing}
							<td>
								<FormInput
									bind:value={address.postalCode}
									id="postal-code"
									name="postal-code"
									type="text"
									placeholder={user.address?.postalCode ?? ''}
									autocomplete="postal-code"
									error={addressErrors.postalCode}
									onFocus={handlePostalCodeInteraction}
									onInput={handlePostalCodeInteraction}
									{smallErrors}
								/>
							</td>
						{:else if user.address?.postalCode}
							<td>{user.address.postalCode}</td>
						{:else}
							<td class="text-gray-400">No postal code</td>
						{/if}
					</tr>
					<tr>
						<th>Country</th>
						{#if isEditing}
							<td>
								<FormInput
									bind:value={address.country}
									id="country"
									name="country"
									type="text"
									placeholder={user.address?.country ?? ''}
									autocomplete="country"
									error={addressErrors.country}
									onFocus={handleCountryInteraction}
									onInput={handleCountryInteraction}
									{smallErrors}
								/>
							</td>
						{:else if user.address?.country}
							<td>{user.address.country}</td>
						{:else}
							<td class="text-gray-400">No country</td>
						{/if}
					</tr>
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
