<script>
	export let name;
	import { fade } from "svelte/transition";
	let database = {
		admin: "william",
		test: "majarox!",
	};

	let username = "";
	let password = "";

	let authenticated = false;

	$: {
		authenticated = username in database && database[username] == password;
	}
</script>

<main>
	<h1>{name}</h1>
	<input type="text" placeholder="Username" bind:value={username} />
	<input type="password" placeholder="Password" bind:value={password} />
	{#if authenticated}
		{#if username == "admin"}
			<p transition:fade>Whoa du hackade admin</p>
		{:else}
			<p transition:fade>Välkommen {username}</p>
		{/if}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
