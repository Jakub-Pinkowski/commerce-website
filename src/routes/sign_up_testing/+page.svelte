<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Sign up</h1>
	<form method="post" use:enhance>
		<label for="username">Username</label>
		<input class="border" name="username" id="username" /><br />
		<label for="password">Password</label>
		<input class="border" type="password" name="password" id="password" /><br />
		<button>Continue</button>
	</form>
</div>
