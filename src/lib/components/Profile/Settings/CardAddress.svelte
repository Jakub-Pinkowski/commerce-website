<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let user: User;
	console.log('user: ', user);
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
