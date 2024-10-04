<script lang="ts">
	import {
		pointsThreshholds,
		getCurrentStatus,
		getNextThreshold,
		getStatusClass
	} from '$lib/helpers/points';
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body p-4 md:p-8">
		<h2 class="card-title">Points 101</h2>
		<div>
			<p>
				Get rewarded for every purchase you make. Earn points for every dollar spent and use them to
				get discounts on your next order!
			</p>
			<ul>
				<li><strong>1 point</strong> for every <strong>$1</strong> spent</li>
				<li>Earn points during special events</li>
			</ul>
		</div>
		<div>
			<h3 class="mb-3 text-xl font-semibold">Statuses</h3>
			<ul class="list-inside list-disc space-y-2">
				{#each Object.entries(pointsThreshholds) as [status, points]}
					<li class={getStatusClass(status)}>
						<strong class="capitalize">{status}:</strong>
						{points} points
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
