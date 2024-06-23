<script lang="ts">
	import { register } from 'swiper/element/bundle';

	register();

	const spaceBetween = 10;
</script>

<div>
	<h1>New</h1>
	<swiper-container
		slides-per-view={3}
		space-between={spaceBetween}
		centered-slides={true}
		pagination={{
			hideOnClick: true
		}}
	>
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
	</swiper-container>
</div>
