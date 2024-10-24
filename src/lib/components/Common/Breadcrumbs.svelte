<script lang="ts">
	let {
		breadcrumbs
	}: {
		breadcrumbs: string[];
	} = $props();
</script>

<div class="breadcrumbs mb-6 text-xs">
	<ul>
		{#each breadcrumbs as breadcrumb, index}
			<li>
				{#if index === breadcrumbs.length - 1}
					{breadcrumb}
				{:else if breadcrumb === 'Home'}
					<a href="/">{breadcrumb}</a>
				{:else}
					<a
						href={'/' +
							breadcrumbs
								.slice(1, index + 1)
								.join('/')
								.toLowerCase()}>{breadcrumb}</a
					>
				{/if}
			</li>
		{/each}
	</ul>
</div>
