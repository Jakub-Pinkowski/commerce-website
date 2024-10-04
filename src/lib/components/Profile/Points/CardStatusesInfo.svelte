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
		<h2 class="card-title">Status 101</h2>
		<div>
			<p class="mb-2 text-gray-600">
				Your status is determined by the number of points you have accumulated over time.
			</p>
			<p class="text-gray-600">Advance to unlock more rewards!</p>
			<ul class="mt-2 list-inside list-disc space-y-2">
				{#each Object.entries(pointsThreshholds) as [status, { points, bonus }]}
					<li class={`pt-2 ${getStatusClass(status)}`}>
						<strong class="capitalize">{status}:</strong>
						{points} points
						<p class="ml-6 text-sm text-gray-500">{bonus}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
