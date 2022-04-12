<script>
	let show_password = false;
</script>

<div class="flex h-screen">
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
