<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let user: User;

	let isEditing = false;

	let address: {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	} = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	const toggleEdit = () => {
		isEditing = !isEditing;
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
								<label class="input input-bordered flex h-8 w-full items-center gap-2 pr-0">
									<input
										type="text"
										bind:value={address.street}
										placeholder={user.address?.street ?? ''}
										autocomplete="street-address"
									/>
								</label>
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
								<label class="input input-bordered flex h-8 w-full items-center gap-2 pr-0">
									<input
										type="text"
										bind:value={address.city}
										placeholder={user.address?.city ?? ''}
										autocomplete="address-level2"
									/>
								</label>
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
								<label class="input input-bordered flex h-8 w-full items-center gap-2 pr-0">
									<input
										type="text"
										bind:value={address.state}
										placeholder={user.address?.state ?? ''}
										autocomplete="address-level1"
									/>
								</label>
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
								<label class="input input-bordered flex h-8 w-full items-center gap-2 pr-0">
									<input
										type="text"
										bind:value={address.postalCode}
										placeholder={user.address?.postalCode ?? ''}
										autocomplete="postal-code"
									/>
								</label>
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
								<label class="input input-bordered flex h-8 w-full items-center gap-2 pr-0">
									<input
										type="text"
										bind:value={address.country}
										placeholder={user.address?.country ?? ''}
										autocomplete="country"
									/>
								</label>
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
