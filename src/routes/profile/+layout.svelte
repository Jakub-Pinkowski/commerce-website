<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let dropdown: HTMLDivElement;
	let dropdownOpen: boolean = false;

	const handleTouchStart = (event: TouchEvent) => {
		if (dropdown && !dropdown.contains(event.target as Node)) {
			dropdownOpen = false;
		}
	};

	const handleClick = () => {
		dropdownOpen = !dropdownOpen;
	};

	onMount(() => {
		document.addEventListener('touchstart', handleTouchStart);
		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
		};
	});
</script>

<div class="flex flex-col gap-4 md:flex-row">
	<!-- Desktop -->
	<ul class="menu hidden h-fit w-56 rounded-box bg-base-200 md:block">
		<li class="menu-title">Account</li>
		<li><a href="/profile">Dashboard</a></li>
		<li><a href="/profile/points">Points</a></li>
		<li><a href="/profile/orders">Orders</a></li>
		<li><a href="/profile/settings">Settings</a></li>
		<li>
			<a href="/profile/logout">
				<button>Logout</button>
			</a>
		</li>
	</ul>
	<!-- Mobile -->
	<div class="dropdown md:hidden" bind:this={dropdown}>
		<button class="btn m-1 w-full justify-between" on:click={handleClick}>
			Account
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="Layer_1"
				data-name="Layer 1"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<path
					d="M0,4c0-.55,.45-1,1-1H18c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm18,15H1c-.55,0-1,.45-1,1s.45,1,1,1H18c.55,0,1-.45,1-1s-.45-1-1-1Zm5-8H6c-.55,0-1,.45-1,1s.45,1,1,1H23c.55,0,1-.45,1-1s-.45-1-1-1Z"
				/>
			</svg>
		</button>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		{#if dropdownOpen}
			<ul
				class="menu absolute z-[1] w-full rounded-box bg-base-100 p-2 shadow"
				transition:fly={{ y: 20, duration: 200 }}
			>
				<li><a href="/profile" on:click={handleClick}>Dashboard</a></li>
				<li><a href="/profile/points" on:click={handleClick}>Points</a></li>
				<li><a href="/profile/orders" on:click={handleClick}>Orders</a></li>
				<li><a href="/profile/settings" on:click={handleClick}>Settings</a></li>
                <!-- FIXME: This runs when I only hover on the button -->
				<li>
					<a data-sveltekit-preload-data="tap" href="/profile/logout">
						<button>Logout</button>
					</a>
				</li>
			</ul>
		{/if}
	</div>
	<div class="w-full">
		<slot />
	</div>
</div>
