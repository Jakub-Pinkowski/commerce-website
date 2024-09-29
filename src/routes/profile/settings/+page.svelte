<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let data;
	const user: User = data.user;

	console.log('user: ', user);
</script>

<div class="w-full">
	<h1 class="p-2 text-3xl font-bold">Settings</h1>
	<div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card flex w-full bg-base-100 shadow-xl">
			<div class="card-body p-4 md:p-8">
				<h2 class="card-title">Your information</h2>
				<!-- TODO: Style later -->
				<div class="flex-none overflow-x-auto">
					<table class="table">
						<tbody>
							<tr>
								<th>Name</th>
								{#if user.name}
									<td>{user.name}</td>
								{:else}
									<td class="text-gray-400">No name</td>
								{/if}
							</tr>
							<tr>
								<th>Email</th>
								{#if user.email}
									<td>{user.email}</td>
								{:else}
									<td class="text-gray-400">No email</td>
								{/if}
							</tr>
							<tr>
								<th>Phone</th>
								{#if user.phone_number}
									<td>{user.phone_number}</td>
								{:else}
									<td class="text-gray-400">No phone</td>
								{/if}
							</tr>
							<tr>
								<th>Address</th>
								{#if user.address}
									<td>{user.address}</td>
								{:else}
									<td class="text-gray-400">No address</td>
								{/if}
							</tr>
						</tbody>
					</table>
				</div>
				<div class="card-actions mt-auto justify-end pt-2">
					<a href="profile/settings" class="btn btn-accent w-full md:w-auto">Edit your info</a>
				</div>
			</div>
		</div>
		<div class="card flex w-full bg-base-100 shadow-xl">
			<div class="card-body p-4 md:p-8">
				<h2 class="card-title">Address</h2>
				<!-- TODO: Style later -->
				<div class="flex-none overflow-x-auto">
					<table class="table">
						<tbody>
							<tr>
								<th>Street</th>
								{#if user.address?.street}
									<td>{user.address.street}</td>
								{:else}
									<td class="text-gray-400">No steet</td>
								{/if}
							</tr>
							<tr>
								<th>City</th>
								{#if user.address?.city}
									<td>{user.address.city}</td>
								{:else}
									<td class="text-gray-400">No city</td>
								{/if}
							</tr>
							<tr>
								<th>State</th>
								{#if user.address?.state}
									<td>{user.address.state}</td>
								{:else}
									<td class="text-gray-400">No state</td>
								{/if}
							</tr>
							<tr>
								<th>Postal Code</th>
								{#if user.address?.postalCode}
									<td>{user.address.postalCode}</td>
								{:else}
									<td class="text-gray-400">No postal code</td>
								{/if}
							</tr>
							<tr>
								<th>Country</th>
								{#if user.address?.country}
									<td>{user.address.country}</td>
								{:else}
									<td class="text-gray-400">No country</td>
								{/if}
							</tr>
						</tbody>
					</table>
				</div>
				<div class="card-actions mt-auto justify-end pt-2">
					<a href="profile/settings" class="btn btn-accent w-full md:w-auto">Edit your info</a>
				</div>
			</div>
		</div>
	</div>
</div>
