<script lang="ts">
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { EventsTargetAudienceOptions } from '$lib/pocketbase-types';
	import { cn } from '$lib/utils.js';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { formSchema } from './schema';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				toast.success('Settings saved');
			} else {
				toast.error('Failed to save settings');
			}
		}
	});

	const { form: formData, enhance, errors } = form;

	const targetAudienceOptions = Object.values(EventsTargetAudienceOptions);

	const dateFormatter = new DateFormatter('en-US', {
		dateStyle: 'full',
		timeStyle: 'short'
	});

	function parseDateString(dateString: string | null): DateValue | undefined {
		if (!dateString) return undefined;

		try {
			const date = new Date(dateString);
			return parseDate(date.toISOString().split('T')[0]);
		} catch (e) {
			console.error('Error parsing date:', e);
			return undefined;
		}
	}
</script>

<div class="w-full max-w-2xl self-center px-2 pb-20">
	<span class="mb-6 block text-2xl font-semibold">
		Event settings of {data.event?.title}
	</span>

	<form method="POST" use:enhance class="space-y-6">
		{#if $errors._errors}
			<Alert variant="destructive" class="mb-4">
				<AlertDescription>
					{$errors._errors}
				</AlertDescription>
			</Alert>
		{/if}

		<Form.Field {form} name="title">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Event Title*</Form.Label>
					<Input {...props} bind:value={$formData.title} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Description</Form.Label>
					<Textarea {...props} bind:value={$formData.description} rows={5} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Fieldset {form} name="targetAudience">
			<Form.Legend>Target Audience*</Form.Legend>
			<div class="flex flex-col gap-2">
				{#each targetAudienceOptions as option}
					{@const checked = $formData.targetAudience?.includes(option) || false}
					<div class="flex items-center gap-2">
						<Form.Control>
							{#snippet children({ props })}
								<Checkbox
									{...props}
									{checked}
									value={option}
									onCheckedChange={(v) => {
										if (!$formData.targetAudience) $formData.targetAudience = [];
										if (v) {
											if (!$formData.targetAudience.includes(option)) {
												$formData.targetAudience = [...$formData.targetAudience, option];
											}
										} else {
											$formData.targetAudience = $formData.targetAudience.filter(
												(item) => item !== option
											);
										}
									}}
								/>
								<Form.Label class="font-normal">
									{option.charAt(0).toUpperCase() + option.slice(1)}
								</Form.Label>
							{/snippet}
						</Form.Control>
					</div>
				{/each}
			</div>
			<Form.FieldErrors />
		</Form.Fieldset>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Form.Field {form} name="startDate">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Start Date*</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-full justify-start pl-4 text-left font-normal',
									!$formData.startDate && 'text-muted-foreground'
								)}
							>
								{$formData.startDate
									? dateFormatter.format(new Date($formData.startDate))
									: 'Select start date and time'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									bind:value={
										() => parseDateString($formData.startDate),
										(v) => {
											$formData.startDate = v ? v.toString() : '';
										}
									}
									placeholder={today(getLocalTimeZone())}
									calendarLabel="Start Date"
								/>
							</Popover.Content>
						</Popover.Root>
						<input hidden value={$formData.startDate} name={props.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="endDate">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>End Date*</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-full justify-start pl-4 text-left font-normal',
									!$formData.endDate && 'text-muted-foreground'
								)}
							>
								{$formData.endDate
									? dateFormatter.format(new Date($formData.endDate))
									: 'Select end date and time'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									bind:value={
										() => parseDateString($formData.endDate),
										(v) => {
											$formData.endDate = v ? v.toString() : '';
										}
									}
									placeholder={today(getLocalTimeZone())}
									calendarLabel="End Date"
								/>
							</Popover.Content>
						</Popover.Root>
						<input hidden value={$formData.endDate} name={props.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<Form.Field {form} name="externalUrl">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>External URL</Form.Label>
					<Input {...props} bind:value={$formData.externalUrl} placeholder="https://..." />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Form.Field {form} name="earlyAccess" class="flex flex-row items-start space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<Checkbox {...props} bind:checked={$formData.earlyAccess} />
						<div class="space-y-1 leading-none">
							<Form.Label>Allow Early Access</Form.Label>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="lateAccess" class="flex flex-row items-start space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<Checkbox {...props} bind:checked={$formData.lateAccess} />
						<div class="space-y-1 leading-none">
							<Form.Label>Allow Late Access</Form.Label>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Form.Field {form} name="responseLimit">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Total Response Limit</Form.Label>
						<Input {...props} type="number" min="0" bind:value={$formData.responseLimit} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="userResponseLimit">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Per-User Response Limit</Form.Label>
						<Input {...props} type="number" min="0" bind:value={$formData.userResponseLimit} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<Form.Field {form} name="serialPrefix">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Serial Number Prefix</Form.Label>
					<Input {...props} bind:value={$formData.serialPrefix} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="pt-4">
			<Button type="submit" class="w-full">Save Settings</Button>
		</div>
	</form>
</div>
