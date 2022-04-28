<script>
	export let clicks;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">ANTAL KLICKS!!!</h1>
			<p class="py-6">
				{clicks}
			</p>
			<button
				on:click={() => {
					/* https://kit.svelte.dev/docs/routing#endpoints-page-endpoints */
					/* append /__data.json to retrieve only the json data from a page endpoint */
					fetch('/clicker/__data.json', {
						method: 'POST' // or 'PUT'
					})
						.then((e) => e.json())
						.then((e) => {
							clicks = e.clicks;
						});
				}}
				class="btn btn-primary">KLICKA!!!</button
			>
		</div>
	</div>
</div>
