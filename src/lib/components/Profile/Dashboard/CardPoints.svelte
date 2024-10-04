<script lang="ts">
	// TODO: Replace with user's points later
	import { capitalizeFirstWord } from '$lib/helpers/utils';
	import { getCurrentStatus, getNextThreshold, getStatusClass } from '$lib/helpers/points';

	import type { User } from '$lib/types/userTypes';

	export let user: User;
	export let dashboardView: boolean = false;

	const currentStatus = getCurrentStatus(user.points);
	const { status: nextStatus, threshold } = getNextThreshold(user.points);
	const pointsToNextThreshold = threshold - user.points;
	const statusClass = getStatusClass(currentStatus);
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Your Commerce points</h2>
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
		{#if dashboardView}
			<div class="card-actions mt-auto justify-end pt-2">
				<a href="profile/points" class="btn btn-accent w-full md:w-auto">Go to your points</a>
			</div>
		{/if}
	</div>
</div>
