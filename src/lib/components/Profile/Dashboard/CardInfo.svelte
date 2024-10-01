<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let user: User;
</script>

<div class="card w-full bg-base-100 shadow-xl">
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
						{#if user.phone}
							<td>{user.phone}</td>
						{:else}
							<td class="text-gray-400">No phone</td>
						{/if}
					</tr>
					<tr>
						<th>Address</th>
						{#if user.address && user.address.street && user.address.city && user.address.state && user.address.postalCode && user.address.country}
							<td>
								{user.address.street}, {user.address.city}<br />
								{user.address.state}
								{user.address.postalCode}, {user.address.country}
							</td>
						{:else}
							<td class="text-gray-400">No address</td>
						{/if}
					</tr>
				</tbody>
			</table>
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="/profile/settings" class="btn btn-accent w-full md:w-auto">Edit your info</a>
		</div>
	</div>
</div>
