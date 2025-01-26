<script lang="ts">
	import { fade } from 'svelte/transition';
	let showBanner: boolean = $state(true);

	const hideBanner = () => {
		showBanner = false;
	};
</script>

{#if showBanner}
	<div class="flex justify-center" transition:fade>
		<section class="hero border-accent relative mx-[-1.5rem] mb-2 w-screen border-y md:mx-[-2rem]">
			<button
				class="btn btn-circle btn-ghost absolute top-2 right-2 z-10 rounded-full"
				aria-label="Close banner"
				onclick={hideBanner}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Outline"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path
						d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
					/>
				</svg>
			</button>
			<div class="hero-overlay bg-light-accent/60"></div>
			<div class="hero-content text-neutral-content max-w-full text-center">
				<div class="text-dark max-w-[85%] md:max-w-full">
					<h1 class="mb-2 text-xl">
						This project is still a work in progress, website is under constant development.
					</h1>
					<h2 class="text-bold text-secondary mb-4 text-xl">New features added regularly!</h2>
					<p class="mb-1 text-xs">
						Disclaimer: This website is a demonstration project and not an actual e-commerce store.
						You cannot make purchases here. All names or brands mentioned are purely fictional and
						all products' images have been AI generated.
					</p>
					<p class="mb-1 text-xs">
						Anonymous data is collected for analytics and performance purposes only.
						<strong>No cookies are used for these purposes.</strong>
						By using this website, you agree to this data collection. For more information, see the official
						Vercel's
						<a
							class="link"
							href="https://vercel.com/docs/analytics/privacy-policy#data-point-information"
							target="_blank">Analytics</a
						>
						and
						<a
							class="link"
							href="https://vercel.com/docs/speed-insights/privacy-policy#how-the-data-points-are-tracked"
							target="_blank">Speed insights</a
						> privacy policies.
					</p>
					<p class="text-xs">
						The website uses cookies for user authentication, user profiles, managing orders, and
						OAuth. By creating an account, you agree to the use of those cookies.
					</p>
				</div>
			</div>
		</section>
	</div>
{/if}
