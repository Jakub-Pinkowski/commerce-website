<script lang="ts">
	import { totalWishlistItems } from '$lib/stores/wishlist';

	let { className = '', closeMenu }: { className?: string; closeMenu: () => void } = $props();
</script>

<a
	class={`btn btn-circle btn-ghost mx-1 flex items-center ${className}`}
	href="/wishlist"
	onclick={closeMenu}
>
	<div class="indicator">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<g id="_01_align_center" data-name="01 align center">
				<path
					d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
				/>
			</g>
		</svg>

		<span
			class="badge indicator-item badge-sm right-[-5px] border-none bg-transparent p-0 text-base text-secondary"
		>
			{#if $totalWishlistItems > 0}
				{$totalWishlistItems}
			{/if}
		</span>
	</div>
</a>
