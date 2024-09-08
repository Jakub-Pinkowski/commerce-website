<script lang="ts">
	export let className: string = '';
	export let closeMenu: () => void;
</script>

<a
	class={`btn btn-circle btn-ghost mx-1 flex items-center ${className}`}
	href="/profile"
	on:click={closeMenu}
>
	<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24">
		<path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" />
		<path
			d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"
		/>
	</svg>
</a>
