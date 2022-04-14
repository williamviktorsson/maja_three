<script>
	import { fly, fade, slide, draw } from 'svelte/transition';
	export let error;
	let show_password = false;
</script>

<div class="flex h-screen">
	<div class="m-auto">
		<form
			method="post"
			on:submit={() => {
				error = null;
			}}
		>
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

				<div
					class:disp={!error}
					class="alert alert-error shadow-lg"
					in:fly={{ x: -2000, duration: 300 }}
					out:fade
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Wrong password!</span>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.disp {
		visibility: hidden;
	}
</style>
