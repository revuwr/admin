<script lang="ts">
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	let {
		data,
		open = $bindable()
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
		open: boolean;
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, errors } = form;
</script>

<form method="POST" use:enhance>
	{#if $errors._errors || Object.values($errors).some((e) => e)}
		<Alert variant="destructive" class="mb-4">
			<AlertDescription>
				{$errors._errors || 'Please correct the errors below.'}
			</AlertDescription>
		</Alert>
	{/if}

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input {...props} bind:value={$formData.password} type="password" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-4">Submit</Form.Button>
</form>
