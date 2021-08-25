<script>
	export let name;
	import { fade } from "svelte/transition";
	import Snackbar, { Actions, Label } from "@smui/snackbar";

	let snackbarWithoutClose;

	let database = {
		admin: "bruh",
		test: "test",
	};

	let username = "";
	let password = "";

	let authenticated = false;
	let authenticating = true;

	let errol;

	async function login() {
		authenticating = true;
		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", " http://localhost:3000/authenticate", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(
				JSON.stringify({
					username: "xyz",
				})
			);
			xhr.onload = function () {
				console.log("HELLO");
				console.log(this.responseText);
				var data = JSON.parse(this.responseText);
				console.log(data);
			};
		} catch (error) {
			errol = error;
			snackbarWithoutClose.open();
		}
		authenticating = false;
	}
</script>

<main>
	<h1>{name}</h1>
	<input type="text" placeholder="Username" bind:value={username} />
	<input type="password" placeholder="Password" bind:value={password} />
	<button on:click={() => login()}>
		{#if authenticated}
			{#if username == "admin"}
				<p transition:fade>Whoa du hackade admin</p>
			{:else}
				<p transition:fade>Välkommen {username}</p>
			{/if}
		{/if}
		<Snackbar bind:this={snackbarWithoutClose}>
			<Label>{errol}</Label>
		</Snackbar>
	</button>
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
