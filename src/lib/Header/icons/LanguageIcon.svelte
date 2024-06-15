<!-- TODO: Make the languages work -->
<script lang="ts">
	export let className: string = '';
	export let closeMenu: () => void;
	let language: string = 'EN';

    const switchLanguage = (lang: string) => {
        language = lang;
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') closeMenu();
    };
</script>

<div
	title="Change Language"
	class={`dropdown dropdown-end mx-1 ${className}`}
	tabindex="0"
	role="button"
	on:click={closeMenu}
    on:keydown={handleKeydown}
>
	<div tabindex="0" role="button" class="btn btn-circle btn-ghost" aria-label="Language">
		<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24"
			><path
				d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z"
			/></svg
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
