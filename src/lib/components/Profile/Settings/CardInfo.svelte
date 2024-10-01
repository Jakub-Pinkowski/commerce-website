<script lang="ts">
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
				</tbody>
			</table>
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="/profile/settings" class="btn btn-accent w-full md:w-auto">Edit your info</a>
		</div>
	</div>
</div>
