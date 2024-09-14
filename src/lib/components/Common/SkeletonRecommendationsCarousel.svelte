<div class="my-8">
	<div class="flex items-center justify-between">
		<div class="skeleton h-8 w-20 lg:w-32"></div>
		<div class="skeleton h-8 w-24 lg:w-40"></div>
	</div>
	<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
		<div class="flex w-full flex-shrink-0 gap-2 md:hidden md:w-full">
			<div class="flex w-10/12 flex-col">
				<div class="skeleton h-64 w-full"></div>
				<div class="pt-2">
					<div class="skeleton h-6 w-3/4"></div>
					<div class="skeleton mt-2 h-4 w-20"></div>
					<div class="mt-4">
						<div class="skeleton h-6 w-16"></div>
					</div>
				</div>
			</div>
			<div class="flex w-2/12 flex-col">
				<div class="skeleton h-64 w-full"></div>
				<div class="pt-2">
					<div class="skeleton h-6 w-full"></div>
					<div class="skeleton mt-2 h-4 w-full"></div>
					<div class="mt-4">
						<div class="skeleton h-6 w-full"></div>
					</div>
				</div>
			</div>
		</div>
		{#each Array(4) as _}
			<div class="hidden flex-col md:flex">
				<div class="skeleton h-64 w-full"></div>
				<div class="pt-2">
					<div class="skeleton h-6 w-3/4"></div>
					<div class="skeleton mt-2 h-4 w-32"></div>
					<div class="mt-4">
						<div class="skeleton h-6 w-20"></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
