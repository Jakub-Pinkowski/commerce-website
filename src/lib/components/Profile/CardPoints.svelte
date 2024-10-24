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

    let { user, orders, dashboardView }: { user: User; orders: Order[]; dashboardView?: boolean } = $props();

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

<div class={`card w-full bg-base-100 shadow-xl ${!dashboardView ? 'md:col-span-2' : ''}`}>
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Your Commerce points</h2>
		<div class={`flex flex-col gap-4 md:flex-row ${dashboardView ? '!flex-col' : ''}`}>
			<div
				class={`stats ${!dashboardView ? 'w-full md:w-1/2' : ''} grid-flow-row shadow md:grid-flow-col`}
			>
				<div class="stat">
					<div class="stat-figure text-primary"></div>
					<div class="stat-title">Points</div>
					<div class="stat-value text-primary">
						{user.points}
					</div>
					<div class="stat-desc">+{pointsLastMonth} in the last month</div>
				</div>

				<div class="stat !border-l-0 !border-t-[1px] md:!border-l-[1px] md:!border-t-0">
					<div class={`stat-figure ${statusClass}`}></div>
					<div class="stat-title">Status</div>
					<div class={`stat-value ${statusClass}`}>{capitalizeFirstWord(currentStatus)}</div>
					<div class="stat-desc">
						{#if pointsToNextThreshold > 0}{pointsToNextThreshold} points to {capitalizeFirstWord(
								nextStatus
							)}
						{:else}
							Max status achieved
						{/if}
					</div>
				</div>
			</div>
			<div class={`mt-2 flex flex-col ${!dashboardView ? 'w-full md:w-1/2' : ''}`}>
				<p class="font-semibold">Current Bonus:</p>
				<p>
					{currentBonus}
				</p>
			</div>
		</div>

		{#if dashboardView}
			<div class="card-actions mt-auto justify-end pt-2">
				<a href="profile/points" class="btn btn-accent w-full md:w-auto">Go to your points</a>
			</div>
		{/if}
	</div>
</div>
