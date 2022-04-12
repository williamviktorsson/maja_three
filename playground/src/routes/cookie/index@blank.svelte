<!-- https://kit.svelte.dev/docs/loading -->
<script context="module">
	export async function load({ fetch }) {
		const response = await fetch('/api/cookie', {
			method: 'GET'
		});

		const data = await response.json();

		return {
			props: {
				clicks: data.clicks
			}
		};
	}
</script>

<script>
	export let clicks;
</script>

{clicks}

<button
	on:click={() => {
		fetch('/api/cookie', {
			method: 'POST' // or 'PUT'
		})
			.then((e) => e.json())
			.then((e) => {
				clicks = e.clicks;
			});
	}}
	class="btn">CLICK ME</button
>
