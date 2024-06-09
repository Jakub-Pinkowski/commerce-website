<header>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost">Home</a>
			<a href="/shop" class="btn btn-ghost">Shop</a>
			<a href="/categories" class="btn btn-ghost">Categories</a>
			<a href="/new" class="btn btn-ghost">New</a>
		</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-xl">Logo</a>
		</div>
		<div class="navbar-end">
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
