<script lang="ts">
	// TODO: Hook it up to a real API
	import { fade } from 'svelte/transition';

	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';
	import FormInput from '$lib/components/Common/FormInput.svelte';
	import FormTextArea from '$lib/components/Common/FormTextArea.svelte';

	const breadcrumbs = ['Home', 'Company', 'Contact'];

	let name: string = $state('');
	let email: string = $state('');
	let message: string = $state('');
	let nameError: string = $state('');
	let emailError: string = $state('');
	let messageError: string = $state('');
	let toastSuccess: boolean = $state(false);
	let toastMessage: string = $state('');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

        resetErros();

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

		toastSuccess = true;
		toastMessage = 'Message sent successfully';

		setTimeout(() => {
			toastSuccess = false;
		}, 2000);

		resetForm();
	};

	const isValidEmail = (value: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	const resetForm = () => {
		name = '';
		email = '';
		message = '';
	};

    const resetErros = () => {
        nameError = '';
        emailError = '';
        messageError = '';
    };

	const handleNameInteraction = () => {
		nameError = '';
	};

	const handleEmailInteraction = () => {
		emailError = '';
	};

	const handleMessageInteraction = () => {
		messageError = '';
	};
</script>

<Breadcrumbs {breadcrumbs} />
<div class="mx-auto max-w-xl text-center">
	<h1 class="mb-8 text-5xl font-bold dark:text-white">Contact Us</h1>
	<form onsubmit={handleSubmit} class="mb-8 flex flex-col items-center">
		<FormInput
			bind:value={name}
			id="name"
			name="name"
			type="text"
			placeholder="Name*"
			autocomplete="name"
			error={nameError}
			onfocus={handleNameInteraction}
			oninput={handleNameInteraction}
		/>
		<FormInput
			bind:value={email}
			id="email"
			name="email"
			type="email"
			placeholder="Email*"
			autocomplete="email"
			error={emailError}
			onfocus={handleEmailInteraction}
			oninput={handleEmailInteraction}
		/>
		<FormTextArea
			bind:value={message}
			id="message"
			name="message"
			placeholder="Message*"
			error={messageError}
			onfocus={handleMessageInteraction}
			oninput={handleMessageInteraction}
		/>
		<button class="btn btn-primary mt-8 w-full" type="submit"> Submit </button>
	</form>
</div>

{#if toastSuccess}
	<div class="toast toast-center toast-top" transition:fade>
		<div class="alert alert-success">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}
