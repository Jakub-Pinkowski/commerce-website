<script lang="ts">
	import { formatDate } from '$lib/helpers/utils';
	import { getPointsStatus } from '$lib/helpers/points';

	import type { Order } from '$lib/types/orderTypes';

	export let orders: Order[];
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Your points history</h2>
		<p>Points are added to your account 30 days after the order has been completed.</p>
		<!-- Desktop -->
		<table class="table hidden md:table">
			<tbody>
				<tr>
					<th>Date</th>
					<th>Order number</th>
					<th>Status</th>
					<th>Points earned</th>
				</tr>
				{#each orders as order}
					<tr>
						<td>{formatDate(order.createdAt)}</td>
						<td>{order.id}</td>
						<td>{getPointsStatus(order.createdAt)}</td>
						<td class="font-bold text-primary">{order.points}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<!-- Mobile -->
		<table class="table md:hidden">
			<tbody>
				<tr>
					<th>Date</th>
					<th>Order</th>
					<th>Status</th>
					<th>Points</th>
				</tr>
				{#each orders as order}
					<tr>
						<td>{formatDate(order.createdAt)}</td>
						<td>{order.id}</td>
						<td>{getPointsStatus(order.createdAt)}</td>
						<td class="font-bold text-primary">{order.points}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style scoped>
	@media (max-width: 768px) {
		.table :where(th, td) {
			padding-right: 1rem !important;
		}
	}
</style>
