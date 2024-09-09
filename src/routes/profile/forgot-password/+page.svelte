<script lang="ts">
	import Breadcrumbs from '$lib/components/Common/Breadcrumbs.svelte';

	let breadcrumbs = ['Home', 'Profile', 'Forgot password'];
</script>

<div>
	<Breadcrumbs {breadcrumbs} />
	<h1>Forgot password</h1>
</div>
