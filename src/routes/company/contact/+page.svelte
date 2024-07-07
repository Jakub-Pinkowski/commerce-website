<script lang="ts">
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	let name: string;
	let email: string;
	let message: string;
	let nameError: string;
	let emailError: string;
	let messageError: string;
	let toastSuccess: boolean = false;
	let toastMessage: string;
	let formSubmitted: boolean = false;

	const isFormValid = (): boolean => {
		return Boolean(name && isValidEmail(email) && message);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		formSubmitted = true;

		nameError = '';
		emailError = '';
		messageError = '';

		if (!name) {
			nameError = 'Please enter your name';
		}

		if (!email) {
			emailError = 'Please enter your email';
		} else if (!isValidEmail(email)) {
			emailError = 'Please enter a valid email';
		}

		if (!message) {
			messageError = 'Please enter your message';
		}

		if (nameError || emailError || messageError) {
			return;
		}

		// TODO: Add real API endpoint
		toastSuccess = true;
		toastMessage = 'Message sent successfully';

		setTimeout(() => {
			toastSuccess = false;
		}, 2000);

		resetForm();
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

<div class="breadcrumbs mb-6 text-xs">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/company">Company</a></li>
        <li>Contact</li>
	</ul>
</div>

<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-bold dark:text-white">Contact Us</h1>
	<form on:submit={handleSubmit} class="mb-8 flex flex-col items-center">
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input bind:value={name} id="name" name="name" type="text" class="grow" placeholder="Name*" />
		</label>
		{#if nameError}<span class="text-xs text-red-500">{nameError}</span>{/if}
		<label class="input input-bordered my-4 flex w-full items-center gap-2">
			<input
				bind:value={email}
				id="email"
				name="email"
				type="email"
				class="grow"
				placeholder="Email*"
			/>
		</label>
		{#if emailError}<span class="text-xs text-red-500">{emailError}</span>{/if}
		<textarea
			bind:value={message}
			id="message"
			name="message"
			class="textarea textarea-bordered my-4 w-full gap-2 text-base"
			placeholder="Message*"
			cols="30"
			rows="5"
		>
		</textarea>
		{#if messageError}<span class="text-xs text-red-500">{messageError}</span>{/if}
		<button
			class="btn btn-primary mt-8 w-full"
			type="submit"
			disabled={formSubmitted && !isFormValid()}>Submit</button
		>
	</form>
</div>

{#if toastSuccess}
	<div class="toast toast-center toast-top" transition:fade>
		<div class="alert alert-success">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}
