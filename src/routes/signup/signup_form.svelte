<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { arktypeClient } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<typeof formSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: arktypeClient(formSchema),
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
			}
		}
	});

	let { form: formData, enhance } = form;
</script>

<SuperDebug data={formData}></SuperDebug>
<form method="POST" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input autocomplete="off" {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your email</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input autocomplete="off" type="password" {...props} bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Submit</Form.Button>
</form>
