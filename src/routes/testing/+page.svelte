<script lang="ts">
	const baseUrl = 'commercewebsite-633103942.imgix.net';
	const bikeImage =
		'assets/products/bikes/green-city-cruiser/green-city-cruiser_0-cGMsC9SiKeJYYYfVptX4ALjgd2v6lz.png';
	const widths = [50, 100, 200, 400, 600, 800, 1000];
</script>

<div>
    {#each widths as width}
        <img src={`https://${baseUrl}/${bikeImage}?w=${width}`} alt="random bike" />
    {/each}
</div>
