<script context="module">
	export async function load({ session }) {


		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
	import '../app.css';
	export let user;
</script>

{#if user}
	<h1>
		Welcome: {user}
	</h1>
{/if}

<slot />
