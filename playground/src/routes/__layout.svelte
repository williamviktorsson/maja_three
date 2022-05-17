<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import '../app.css';

	async function logout() {
		await fetch('/login', { method: 'DELETE' }).then((e) => {
			goto('/login');
		});
	}

	let question = $page.params.question;

</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</svelte:head>

<div class="w-full navbar bg-base-300">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Playground</a>
	</div>

	<div class="flex-none gap-2">
		<form
			on:submit|preventDefault={() => {
				goto(`/search/${question}`);
			}}
		>
			<div class="form-control">
				<input
					bind:value={question}
					type="text"
					placeholder="Search"
					class="input input-bordered"
				/>
			</div>
		</form>
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="https://api.lorem.space/image/face?hash=33791" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				<li><a href="/clicker">Clicker</a></li>
				<li><a href="/settings">Settings</a></li>

				<li>
					<button on:click={logout}>Logout</button>
				</li>
			</ul>
		</div>
	</div>
</div>

<slot />
