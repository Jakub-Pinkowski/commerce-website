<script lang="ts">
	import { formatDate } from '$lib/helpers/utils';

	import type { User } from '$lib/types/userTypes';
	import type { Order } from '$lib/types/orderTypes';

	export let user: User;
	export let orders: Order[];

	// Function to get points status
	const getPointsStatus = (createdAt: Date): string => {
		const orderDate = createdAt;
		const currentDate = new Date();
		const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays >= 30 ? 'Active' : 'Pending';
	};
</script>

<div class="card w-full bg-base-100 shadow-xl md:col-span-2">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Your points history</h2>
		<p>Points are added to your account 30 days after the order has been completed.</p>
		<table class="table">
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
	</div>
</div>
