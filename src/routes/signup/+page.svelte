<script lang="ts">
	import type { PageData } from './$types.js';
	import SignUpForm from './signup_form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="container">
	<SignUpForm {data} />
</div>
