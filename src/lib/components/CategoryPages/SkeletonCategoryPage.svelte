<div class="w-full">
	<div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each Array(2) as _}
			<div class="flex flex-col md:hidden">
				<div class="skeleton h-64 w-full"></div>
				<div class="pt-2">
					<div class="skeleton h-6 w-3/4"></div>
					<div class="skeleton mt-2 h-4 w-20"></div>
					<div class="mt-4">
						<div class="skeleton h-6 w-16"></div>
					</div>
				</div>
			</div>
		{/each}
		{#each Array(4) as _}
			<div class="hidden flex-col md:flex">
				<div class="skeleton h-64 w-full"></div>
				<div class="pt-2">
					<div class="skeleton h-6 w-3/4"></div>
					<div class="skeleton mt-2 h-4 w-32"></div>
					<div class="mt-4">
						<div class="skeleton h-6 w-20"></div>
					</div>
					<div class="mt-4 flex w-full justify-between">
						<div class="skeleton h-6 w-40"></div>
						<div class="skeleton h-6 w-20"></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
