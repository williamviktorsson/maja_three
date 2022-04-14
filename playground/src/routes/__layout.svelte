<script context="module">
	export async function load({ session }) {
		if (!session?.token) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<script>
	import '../app.css';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</svelte:head>

<main>
	<div class="h-screen drawer w-full">
		<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
		<div class="flex flex-col drawer-content">
			<!-- Navbar -->
			<div class="w-full navbar bg-base-300">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-6 h-6 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						>
					</label>
				</div>

				<div class="flex-1 px-2 mx-2">
					<!-- Navbar left item -->
				</div>

				<div class="flex-none hidden lg:block">
					<ul class="menu menu-horizontal">
						<!-- Navbar menu content here -->
						<li><a href="/">Hem</a></li>
						<li><a href="/annat">Annat</a></li>
						<li><a href="/wordle">Wordle</a></li>
						<li><a href="/search">Sök</a></li>
						<li><a href="/settings">Inställningar</a></li>

						<li>
							<form method="post">
								<button type="submit">
									<i class="fa fa-sign-out" style="font-size:36px" />
								</button>
							</form>
						</li>
					</ul>
				</div>
			</div>
			<!-- Page content here -->

			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-3" class="drawer-overlay" />
			<ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
				<!-- Sidebar content here -->
				<li><a href="/">Hem</a></li>
				<li><a href="/annat">Annat</a></li>
				<li><a href="/wordle">Wordle</a></li>
				<li><a href="/search">Sök</a></li>
				<li><a href="/settings">Inställningar</a></li>
			</ul>
		</div>
	</div>
</main>
