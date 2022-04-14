<!-- ERROR PAGE DISPLAYED WHEN ENDPOINTS DONT EXIST -->
<script context="module">
	export async function load({ error, status, session }) {
		if (!session?.token) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

{#if title}
	<div class="error">
		<h1>{title}</h1>
	</div>
{/if}

<style>
	.error {
		height: 100vh;
		display: grid;
		gap: var(--spacing-32);
		place-content: center;
		place-items: center;
	}
</style>
