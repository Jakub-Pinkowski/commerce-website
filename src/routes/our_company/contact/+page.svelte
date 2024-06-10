<script lang="ts">
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	let name: string;
	let email: string;
	let message: string;
	let toastSuccess: boolean = false;
	let toastError: boolean = false;
	let toastMessage: string;

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		console.log({ name, email, message });
	};

	const resetForm = () => {
		name = '';
		email = '';
		message = '';
	};

	const isValidEmail = (value: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};
</script>

<div>
	<h1>Contact</h1>
	<section>
		<form on:submit={handleSubmit}>
			<label class="input input-bordered flex items-center gap-2">
				<input
					bind:value={name}
					id="name"
					name="name"
					type="text"
					class="grow"
					placeholder="Name"
				/>
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<input
					bind:value={email}
					id="email"
					name="email"
					type="email"
					class="grow"
					placeholder="Email"
				/>
			</label>
			<textarea
				bind:value={message}
				id="message"
				name="message"
				class="textarea textarea-bordered"
				placeholder="Message"
				cols="30"
				rows="5"
			></textarea>
			<button class="btn btn-primary" type="submit">Submit</button>
		</form>
	</section>
</div>

{#if toastSuccess}
	<div class="toast toast-center toast-top" transition:fade>
		<div class="alert alert-success">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}

{#if toastError}
	<div class="toast toast-center toast-top" transition:fade>
		<div class="alert alert-error">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}
