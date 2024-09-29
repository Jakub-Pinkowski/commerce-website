<script lang="ts">
	// TODO: Replace with user's points later
	import type { User } from '$lib/types/userTypes';

	export let user: User;
	console.log('user', user);

	let placeholderPoints = 290;

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

	const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'bronze':
				return 'text-yellow-700';
			case 'silver':
				return 'text-gray-400';
			case 'gold':
				return 'text-yellow-500';
			case 'platinum':
				return 'text-gray-300';
			case 'diamond':
				return 'text-blue-300';
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
				<div class="stat-figure text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-8 w-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
				</div>
				<div class="stat-title">Points</div>
				<div class="stat-value text-primary">
					{placeholderPoints}
				</div>
				<div class="stat-desc">+30 in the last month</div>
			</div>

			<div class="!md:border-t-0 stat !border-l-0 !border-t-[1px] md:!border-l-[1px]">
				<div class="stat-figure">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-8 w-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						>
						</path>
					</svg>
				</div>
				<div class="stat-title">Status</div>
				<div class={`stat-value ${statusClass}`}>{capitalize(currentStatus)}</div>
				<div class="stat-desc">
					{#if pointsToNextThreshold > 0}{pointsToNextThreshold} points to {capitalize(nextStatus)}
					{:else}
						Max status achieved
					{/if}
				</div>
			</div>
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="profile/points" class="btn btn-accent">See your Commerce points</a>
		</div>
	</div>
</div>
