<script lang="ts">
    import about_us from '$lib/assets/images/about_us.jpg';
</script>

<div class="breadcrumbs mb-6 text-xs">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/company">Company</a></li>
        <li>About Us</li>
	</ul>
</div>

<div>
	<div
		class="hero h-96 rounded-lg"
        style="background-image: url({about_us}); background-size: cover; background-position: center;"
	>
		<div class="hero-overlay rounded-lg bg-opacity-60"></div>
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">Hello there</h1>
				<p class="mb-5">
					Discover a wide range of products from the world's top brands. Enjoy seamless shopping and
					fast delivery.
				</p>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-6 pt-6">
		<div class="card shadow-lg">
			<div class="card-body">
				<h2 class="card-title">About Us</h2>
				<p>
					We are a team of passionate individuals who love technology and design. Our goal is to
					provide you with the best shopping experience possible.
				</p>
			</div>
		</div>
		<div class="card shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Our Mission</h2>
				<p>
					Our mission is to make shopping easy and enjoyable for everyone. We believe that everyone
					deserves access to the best products at the best prices.
				</p>
			</div>
		</div>
		<div class="card shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Our Vision</h2>
				<p>
					Our vision is to become the go-to destination for all your shopping needs. We want to
					provide you with a seamless shopping experience that you can trust.
				</p>
			</div>
		</div>
	</div>
    
</div>
