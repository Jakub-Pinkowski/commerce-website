<!-- TODO: Make this a real cart -->
<script lang="ts">
	export let className: string = '';
	export let closeMenu: () => void;
</script>

<button
	class={`btn btn-circle btn-ghost mx-1 ${className}`}
	tabindex="0"
	on:click={closeMenu}
>
	<div class="indicator">
		<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24">
			<path
				d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"
			/>
			<circle cx="7" cy="22" r="2" />
			<circle cx="17" cy="22" r="2" />
		</svg>
		<span
			class="badge indicator-item badge-sm border-none bg-transparent p-0 text-base text-red-600"
		>
			8
		</span>
	</div>
</button>
