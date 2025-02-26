<script>
	import clientAuth from '$lib/auth';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="w-min">
	<a
		class={`block shrink-0 whitespace-nowrap rounded-lg bg-slate-50 px-5 py-3 font-medium shadow-md transition-transform hover:scale-[1.03] hover:bg-white`}
		href={clientAuth.getBuiltinUIUrl()}
	>
		Sign in with ✨EdgeDB Built-in UI✨
	</a>
</div>
