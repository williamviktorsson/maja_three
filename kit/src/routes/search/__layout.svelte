<script>
	import Search from '$lib/components/Search.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	import { navigating } from '$app/stores';
	import { page } from '$app/stores';
</script>

<main>
	<Search question={$page.params.question} />

	{#if $navigating}
		<Spinner />
	{:else}
		<slot />
	{/if}
</main>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-direction: column;
		gap: 50px;
		padding-top: 50px;
		padding-left: 10%;
		padding-right: 10%;
		padding-bottom: 5%;
		box-sizing: border-box;
	}
</style>
