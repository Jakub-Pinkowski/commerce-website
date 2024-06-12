<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	let language: string = 'EN';
	let open: boolean = false;

	function switchLanguage(lang: string) {
		language = lang;
	}

	function closeMenu() {
		open = false;
	}
</script>

<header>
	<div class="navbar bg-base-100">
		<div class="navbar-start lg:hidden">
			<div class="z-30">
				<Hamburger bind:open />
			</div>
			{#if open}
				<div
					class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-50"
					on:click={closeMenu}
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') closeMenu();
					}}
					role="button"
					tabindex="0"
				></div>
				<div
					class="fixed left-0 top-0 z-20 h-full w-64 bg-white pt-20 transition-transform duration-200 ease-in-out"
					transition:fly={{ x: -100, duration: 500, easing: quadOut }}
				>
					<a href="/" class="block p-4">Home</a>
					<a href="/categories" class="block p-4">Categories</a>
					<a href="/categories/new" class="block p-4">New</a>
					<a href="/categories/best_sellers" class="block p-4">Best Sellers</a>
					<a href="/categories/sale" class="block p-4">Sale</a>
				</div>
			{/if}
		</div>
		<div class="navbar-start hidden lg:block">
			<a href="/" class="btn btn-ghost">Home</a>
			<a href="/categories" class="btn btn-ghost">Categories</a>
			<a href="/categories/new" class="btn btn-ghost">New</a>
			<a href="/categories/best_sellers" class="btn btn-ghost">Best Sellers</a>
			<a href="/categories/sale" class="btn btn-ghost">Sale</a>
		</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-xl">Logo</a>
		</div>
		<div class="navbar-end">
			<div title="Change Language" class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost" aria-label="Language">
					<span
						class="badge badge-outline badge-sm !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
					>
						{language}
					</span>
					<svg
						width="12px"
						height="12px"
						class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
						><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
					>
				</div>
				<div
					tabindex="-1"
					class="dropdown-content top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto rounded-box border border-white/5 bg-base-200 text-base-content shadow-2xl outline outline-1 outline-black/5"
				>
					<ul class="menu menu-sm gap-1">
						<li>
							<button on:click={() => switchLanguage('EN')}>
								<span
									class="badge badge-outline badge-sm !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
								>
									EN
								</span>
								<span class="font-[sans-serif]">English</span>
							</button>
						</li>
						<li>
							<button on:click={() => switchLanguage('DE')}>
								<span
									class="badge badge-outline badge-sm !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
								>
									DE
								</span>
								<span class="font-[sans-serif]">Deutsch</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
			<button class="btn btn-circle btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span class="badge indicator-item badge-sm">8</span>
					</div>
				</div>
				<div
					tabindex="-1"
					class="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
				>
					<div class="card-body">
						<span class="text-lg font-bold">8 Items</span>
						<span class="text-info">Subtotal: $999</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block">View cart</button>
						</div>
					</div>
				</div>
			</div>
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
				<div class="w-10 rounded-full">
					<a href="/profile">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
