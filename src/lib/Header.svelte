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
				<Hamburger bind:open>
                </Hamburger>
			</div>
			<!-- TODO: Make this look good -->
			<!-- NOTE: Fontawesome icons don't automatically change with the theme -->
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
					<div class="menu flex h-full flex-col bg-base-200">
						<a href="/" class="block p-4 text-xl" on:click={closeMenu}>Home</a>
						<ul>
							<li>
								<a href="/categories" class="block p-4 text-lg" on:click={closeMenu}>Categories</a>
							</li>
							<li>
								<a href="/categories/new" class="block p-4 text-lg" on:click={closeMenu}>New</a>
							</li>
							<li>
								<a href="/categories/best_sellers" class="block p-4 text-lg" on:click={closeMenu}
									>Best Sellers</a
								>
							</li>
							<li>
								<a href="/categories/sale" class="block p-4 text-lg" on:click={closeMenu}>Sale</a>
							</li>
						</ul>
						<div class="mb-4 ml-4 mt-auto flex">
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
							<!-- TODO: Make the languages work -->
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
										><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
										></path></svg
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
						</div>
					</div>
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
			<div title="Change Language" class="dropdown dropdown-end hidden lg:block">
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
			<button class="btn btn-circle btn-ghost hidden lg:block">
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
			<!-- TODO: Make this look good with other icons -->
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon"
					aria-hidden="true"
					focusable="false"
					viewBox="0 0 512 512"
					width="24"
					height="24"
				>
					<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
					<path
						fill="black"
						d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
					/>
				</svg>
			</div>
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
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost hidden lg:block">
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
