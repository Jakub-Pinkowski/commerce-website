<script lang="ts">
	import { capitalizeFirstWord } from '$lib/helpers/utils';
	import {
		pointsThreshholds,
		getCurrentStatus,
		getNextThreshold,
		getStatusClass,
		getLastMonthOrders
	} from '$lib/helpers/points';

	import type { User } from '$lib/types/userTypes';
	import type { Order } from '$lib/types/orderTypes';
	import type { Status } from '$lib/helpers/points';

	export let user: User;
	export let orders: Order[];

	// Get the current status and the next threshold
	const currentStatus: Status = getCurrentStatus(user.points) as Status;
	const { status: nextStatus, threshold } = getNextThreshold(user.points);
	const pointsToNextThreshold = threshold - user.points;
	const statusClass = getStatusClass(currentStatus);
	const currentBonus = pointsThreshholds[currentStatus].bonus;

	// Calculate total points earned in the last month
	const lastMonthOrders = getLastMonthOrders(orders);
	const pointsLastMonth = lastMonthOrders.reduce((total, order) => total + order.points, 0);
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Points 101</h2>
		<div>
			<p>
				Get rewarded for every purchase you make. Earn points for every dollar spent and use them to
				get discounts on your next order!
			</p>
			<ul class="mt-2 list-inside list-disc space-y-2">
				<li><strong>1 point</strong> for every <strong>$1</strong> spent</li>
				<li>Earn more points during special events</li>
				<li>Receive bonus points on your birthday</li>
				<li>Use points to get discounts on your next order</li>
				<li>Points expire after 12 months of inactivity</li>
			</ul>
		</div>
	</div>
</div>
