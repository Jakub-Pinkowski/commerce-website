<footer
	class="footer bottom-0 mt-auto w-full grid-cols-2 bg-dark p-10 pb-2 text-white md:grid-cols-none"
>
	<nav>
		<a href="/categories" class="link-hover link"><h6 class="footer-title">Shopping</h6></a>
		<a href="/categories" class="link-hover link">Categories</a>
		<a href="/categories/new" class="link-hover link">New</a>
		<a href="/categories/best_sellers" class="link-hover link">Best Sellers</a>
		<a href="/categories/sale" class="link-hover link">Sale</a>
	</nav>
	<nav>
		<a href="/company" class="link-hover link"><h6 class="footer-title">Company</h6></a>
		<a href="/company/about_us" class="link-hover link">About Us</a>
		<a href="/company/contact" class="link-hover link">Contact</a>
	</nav>
	<nav>
		<a href="/support" class="link-hover link"><h6 class="footer-title">Support</h6></a>
		<a href="/support/faq" class="link-hover link">FAQ</a>
		<a href="/support/shipping" class="link-hover link">Shipping</a>
		<a href="/support/order_tracking" class="link-hover link">Order tracking</a>
		<a href="/support/return_policy" class="link-hover link">Return Policy</a>
		<a href="/support/warranty" class="link-hover link">Warranty</a>
	</nav>
	<nav>
		<h6 class="footer-title">Social</h6>
		<!-- TODO: Add real socials -->
		<div class="grid grid-flow-col gap-4">
			<a href="/" aria-label="Facebook">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
					>
					</path>
				</svg>
			</a>
			<a href="/" aria-label="Instagram">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					>
					</path>
				</svg>
			</a>
			<a href="/" aria-label="Twitter">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
					>
					</path>
				</svg>
			</a>
		</div>
	</nav>
	<form>
		<h6 class="footer-title">Newsletter</h6>
		<fieldset class="form-control">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label pl-0 text-lg">
				<span>Sign up for a newsletter to get 10% off your first purchase</span>
			</label>
			<div class="join mt-4">
				<input
					type="text"
					placeholder="username@site.com"
					class="input join-item input-bordered text-dark"
				/>
				<button class="btn btn-primary join-item">Subscribe</button>
			</div>
			<span class="mt-3 text-xs">
				By signing up you are agreeing to the terms and conditions. Read our <a
					href="/legal/privacy_policy"
					class="link">Privacy Policy</a
				>.
			</span>
		</fieldset>
	</form>
</footer>
<footer class="footer bg-dark px-10 py-4 text-white">
	<div
		class="flex w-full flex-col items-center gap-3 border-t border-base-200 pt-4 md:flex-row md:justify-start md:gap-4"
	>
		<a href="/legal/terms_and_conditions" class="link">Terms and Conditions</a>
		<span class="hidden md:inline">|</span>
		<a href="/legal/privacy_policy" class="link">Privacy Policy & Cookies</a>
		<span class="hidden md:inline">|</span>
		<p>UIcons by <a href="https://www.flaticon.com/uicons" class="link">Flaticon</a></p>
		<span class="hidden md:inline">|</span>
		<p>Photos by <a href="https://unsplash.com/" class="link">Unplash</a></p>
		<span class="hidden md:inline">|</span>
		<p>© 2024 Jakub Pinkowski, All right reserved</p>
	</div>
</footer>
