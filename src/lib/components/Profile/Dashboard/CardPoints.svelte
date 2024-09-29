<script lang="ts">
	import type { User } from '$lib/types/userTypes';

	export let user: User;
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<!-- TODO: Make it dynamic later -->
		<h2 class="card-title">Commerce points</h2>
		<!-- 
         -->
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
				<div class="stat-value text-primary">250</div>

				<div class="stat-desc">+30 in the last month</div>
			</div>

			<div class="!md:border-t-0 stat !border-l-0 !border-t-[1px] md:!border-l-[1px]">
				<div class="stat-figure text-secondary">
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
				<div class="stat-value text-secondary">Bronze</div>
				<div class="stat-desc">60 points to Silver</div>
			</div>
		</div>
		<div class="card-actions mt-auto justify-end pt-2">
			<a href="profile/points" class="btn btn-accent">See your Commerce points</a>
		</div>
	</div>
</div>
