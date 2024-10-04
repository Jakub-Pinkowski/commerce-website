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
			<p>
				<strong>1 point</strong> for every <strong>$1</strong> spent
			</p>
		</div>
		<div>
			<h3>Statuses and Points Required:</h3>
			<ul>
				{#each Object.entries(pointsThreshholds) as [status, points]}
					<li>
						<strong>{status.charAt(0).toUpperCase() + status.slice(1)}:</strong>
						{points} points
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
