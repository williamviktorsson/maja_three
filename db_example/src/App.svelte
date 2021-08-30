<script>
	export let name;
	import { fade } from "svelte/transition";

	let username = "Admin";
	let password = "";

	let authenticated = false;
	let authenticating = false;

	$: authenticated = false && (username || password);

	async function login() {
		authenticating = true;

		try {
			fetch("http://localhost:3000/authenticate", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (!data) throw null;
					console.log(data);

					if (data.authenticated) {
						authenticated = true;
					} else {
						authenticated = false;
					}
					authenticating = false;
				})
				.catch((error) => {
					console.log(error);
					authenticating = false;
				});
		} catch (e) {
			console.log(e);
			authenticating = false;
		}
	}
</script>

<main>
	<h1>{name}</h1>
	{#if !authenticating}
		<input type="text" placeholder="Username" bind:value={username} />
		<input type="password" placeholder="Password" bind:value={password} />
	{/if}

	<button text on:click={() => login()}> Login </button>
	{#if authenticated}
		{#if username == "admin"}
			<p transition:fade>Whoa du hackade admin</p>
		{:else}
			<p transition:fade>Välkommen {username}</p>
		{/if}
	{:else}
		<p transition:fade>Gör ett försök</p>
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
