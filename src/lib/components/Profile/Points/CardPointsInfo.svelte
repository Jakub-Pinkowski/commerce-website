<script lang="ts">
	import { capitalizeFirstWord } from '$lib/helpers/utils';
	import {
		pointsThreshholds,
		getCurrentStatus,
		getNextThreshold,
		getStatusClass
	} from '$lib/helpers/points';

	import type { User } from '$lib/types/userTypes';
	import type { Status } from '$lib/helpers/points';

	export let user: User;

	const currentStatus: Status = getCurrentStatus(user.points) as Status;
	const { status: nextStatus, threshold } = getNextThreshold(user.points);
	const pointsToNextThreshold = threshold - user.points;
	const statusClass = getStatusClass(currentStatus);
	const currentBonus = pointsThreshholds[currentStatus].bonus;
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
		<h3 class="mt-4 text-lg font-semibold text-primary">Your current points and status</h3>
		<div class="stats grid-flow-row shadow md:grid-flow-col">
			<div class="stat">
				<div class="stat-figure text-primary"></div>
				<div class="stat-title">Points</div>
				<div class="stat-value text-primary">
					{user.points}
				</div>
				<div class="stat-desc">+30 in the last month</div>
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
		<p class="font-semibold">Current Bonus:</p>
		<p>
			{currentBonus}
		</p>
	</div>
</div>
