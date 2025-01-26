<script lang="ts">
	let {
		image,
		title,
		subTitle,
		description,
		linkText,
		linkHref
	}: {
		image: string;
		title: string;
		subTitle: string;
		description?: string;
		linkText: string;
		linkHref: string;
	} = $props();
</script>

<section class="flex justify-center">
	<div
		class="hero mx-[-1.5rem] w-screen md:mx-[-2rem] md:h-96"
		style="background-image: url({image})"
	>
		<div
			class="hero-overlay"
			style="background-color: oklch(32.1785% 0.02476 255.701624 / 0.6);"
		></div>
		<div class="hero-content text-neutral-content text-center">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl">{title}</h1>
				<p class="mb-5 text-xl">{subTitle}</p>
				<a href={linkHref} class="btn btn-primary">{linkText}</a>
			</div>
		</div>
	</div>
</section>
