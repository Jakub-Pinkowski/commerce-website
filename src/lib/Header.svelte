<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import GlobeIcon from './icons/globe.svg';
	import HeartIcon from './icons/heart.svg';
	import SearchIcon from './icons/search.svg';
	import CartIcon from './icons/cart.svg';
	import UserIcon from './icons/user.svg';
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
	<div class="navbar bg-base-100 px-4">
		<div class="navbar-start lg:hidden">
			<div class="btn btn-circle btn-ghost z-30 mx-1">
				<Hamburger bind:open --layer-width="30px" --layer-height="4px" --padding="0 15px"
				></Hamburger>
			</div>
			<div class="btn btn-circle btn-ghost mx-1 flex items-center lg:hidden">
				<a href="/search">
					<img src={SearchIcon} alt="Search" />
				</a>
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
							<div class="btn btn-circle btn-ghost mx-1 flex items-center lg:hidden">
								<a href="/profile">
									<img src={UserIcon} alt="User" />
								</a>
							</div>
							<!-- TODO: Make the languages work -->
							<div title="Change Language" class="dropdown dropdown-end">
								<div
									tabindex="0"
									role="button"
									class="btn btn-circle btn-ghost"
									aria-label="Language"
								>
									<img src={GlobeIcon} alt="Language" />
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
			<div title="Change Language" class="dropdown dropdown-end mx-1 hidden lg:block">
				<div tabindex="0" role="button" class="btn btn-circle btn-ghost" aria-label="Language">
					<img src={GlobeIcon} alt="Language" />
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
			<div class="btn btn-circle btn-ghost mx-1 hidden items-center lg:flex">
				<a href="/search">
					<img src={SearchIcon} alt="Search" />
				</a>
			</div>

			<div class="btn btn-circle btn-ghost mx-1 hidden items-center lg:flex">
				<a href="/profile">
					<img src={UserIcon} alt="User" />
				</a>
			</div>
			<div class="btn btn-circle btn-ghost mx-1 flex items-center">
				<a href="/profile/wishlist">
					<img src={HeartIcon} alt="Heart" />
				</a>
			</div>
			<div class="dropdown dropdown-end mx-1">
				<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
					<div class="indicator">
						<img src={CartIcon} alt="Cart" />
						<span class="badge indicator-item badge-sm">8</span>
					</div>
				</div>
				<!-- TODO: Make this a real cart -->
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
		</div>
	</div>
</header>
