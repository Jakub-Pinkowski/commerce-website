<script lang="ts">
	import type { User } from '$lib/types/userTypes';
	import type { Order } from '$lib/types/orderTypes';
	import type { Status } from '$lib/helpers/points';

	export let user: User;
	export let orders: Order[];
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Your points history</h2>
		<p>Points are added to your account 30 days after the order is completed.</p>
	</div>
</div>
