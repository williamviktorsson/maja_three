<!-- https://kit.svelte.dev/docs/loading -->
<script context="module">
	export async function load({ fetch }) {
		const response = await fetch('/api/cookie', {
			method: 'GET' // or 'PUT'
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
	let show_password = false;
</script>

{clicks}

<div class="flex h-screen">
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
	<div class="m-auto">
		<form method="post">
			<div class="flex flex-col gap-4">
				<input
					type="text"
					placeholder="username"
					name="username"
					class="input input-bordered w-full max-w-xs"
				/>

				<div>
					<input
						type={show_password ? 'text' : 'password'}
						placeholder="password"
						name="password"
						class="input input-bordered w-full max-w-xs"
					/>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Show password</span>
							<input
								type="checkbox"
								bind:checked={show_password}
								class:show_password
								class="checkbox"
							/>
						</label>
					</div>
				</div>

				<button class="btn">Login</button>
			</div>
		</form>
	</div>
</div>
