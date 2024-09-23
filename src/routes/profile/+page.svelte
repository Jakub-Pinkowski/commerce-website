<script lang="ts">
	import UnderConstruction from '$lib/components/Common/UnderConstruction.svelte';
	import { enhance } from '$app/forms';
</script>

<div>
	<UnderConstruction />
	<form method="post" use:enhance>
		<button class="btn btn-accent">Sign out</button>
	</form>
</div>
