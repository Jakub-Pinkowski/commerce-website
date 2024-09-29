<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let data;
	const user: User = data.user;
</script>

<div class="flex flex-col gap-4 md:flex-row">
	<!-- Desktop -->
	<ul class="menu hidden h-fit w-56 rounded-box bg-base-200 md:block">
		<li class="menu-title">Account</li>
		<li><a href="/profile">Dashboard</a></li>
		<li><a href="/profile/points">Points</a></li>
		<li><a href="/profile/orders">Orders</a></li>
		<li><a href="/profile/settings">Settings</a></li>
		<li><a href="/wishlist">Wishlist</a></li>
		<li>
			<a href="/profile/logout">
				<button>Logout</button>
			</a>
		</li>
	</ul>
	<!-- Mobile -->
	<div class="dropdown md:hidden">
		<div tabindex="0" role="button" class="btn m-1 w-full justify-between">
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
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul tabindex="0" class="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow">
			<li><a href="/profile">Dashboard</a></li>
			<li><a href="/profile/points">Points</a></li>
			<li><a href="/profile/orders">Orders</a></li>
			<li><a href="/profile/settings">Settings</a></li>
			<li><a href="/wishlist">Wishlist</a></li>
			<li>
				<a href="/profile/logout">
					<button>Logout</button>
				</a>
			</li>
		</ul>
	</div>
	<slot />
</div>
