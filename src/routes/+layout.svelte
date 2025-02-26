<script lang="ts">
	import { ModeWatcher } from 'mode-watcher'; // https://next.shadcn-svelte.com/docs/dark-mode/svelte
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
