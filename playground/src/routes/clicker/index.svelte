<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import { io } from '$lib/realtime';
	import { onMount } from 'svelte';
	export let clicks;
	onMount(() => {
		io.on('clicks', (event) => {
			clicks = event.clicks;
		});
	});
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		{#if clicks != undefined}
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">ANTAL KLICKS!!!</h1>
				<p class="py-6">
					{clicks}
				</p>
				<button
					on:click={() => {
						io.emit('clicks', 1); // Send the message
					}}
					class="btn btn-primary">KLICKA!!!</button
				>
			</div>
		{:else}
			<Spinner />
		{/if}
	</div>
</div>
