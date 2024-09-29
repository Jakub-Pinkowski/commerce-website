<script lang="ts">
	// TODO: Replace with user's points later
	import { capitalizeFirstWord } from '$lib/helpers/utils';

	import type { User } from '$lib/types/userTypes';

	export let user: User;

	let placeholderPoints = 50;

	let pointsThreshholds = {
		bronze: 0,
		silver: 60,
		gold: 120,
		platinum: 180,
		diamond: 240
	};

	const getCurrentStatus = (points: number) => {
		let currentStatus = 'bronze';
		for (const [status, threshold] of Object.entries(pointsThreshholds)) {
			if (points >= threshold) {
				currentStatus = status;
			} else {
				break;
			}
		}
		return currentStatus;
	};

	const getNextThreshold = (points: number) => {
		for (const [status, threshold] of Object.entries(pointsThreshholds)) {
			if (points < threshold) {
				return { status, threshold };
			}
		}
		return { status: 'diamond', threshold: pointsThreshholds.diamond };
	};

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'bronze':
				return 'text-tier-bronze';
			case 'silver':
				return 'text-tier-silver';
			case 'gold':
				return 'text-tier-gold';
			case 'platinum':
				return 'text-tier-platinum';
			case 'diamond':
				return 'text-tier-diamond';
			default:
				return '';
		}
	};

	const currentStatus = getCurrentStatus(placeholderPoints);
	const { status: nextStatus, threshold } = getNextThreshold(placeholderPoints);
	const pointsToNextThreshold = threshold - placeholderPoints;
	const statusClass = getStatusClass(currentStatus);
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Commerce points</h2>
		<div class="stats grid-flow-row shadow md:grid-flow-col">
			<div class="stat">
				<div class="stat-figure text-primary"></div>
				<div class="stat-title">Points</div>
				<div class="stat-value text-primary">
					{placeholderPoints}
				</div>
				<div class="stat-desc">+30 in the last month</div>
			</div>

			<div class="!md:border-t-0 stat !border-l-0 !border-t-[1px] md:!border-l-[1px]">
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
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="profile/points" class="btn btn-accent w-full md:w-auto">See your Commerce points</a>
		</div>
	</div>
</div>
