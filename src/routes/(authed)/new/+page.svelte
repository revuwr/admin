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
		parseDateTime,
		today
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { formSchema } from './schema';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, errors } = form;

	const targetAudienceOptions = Object.values(EventsTargetAudienceOptions);

	const dateFormatter = new DateFormatter('en-US', {
		dateStyle: 'full',
		timeStyle: 'short'
	});

	let startDateValue = $state<DateValue | undefined>();
	let endDateValue = $state<DateValue | undefined>();
	let placeholder = $state<DateValue>(today(getLocalTimeZone()));

	$effect(() => {
		startDateValue = $formData.startDate ? parseDateTime($formData.startDate) : undefined;
		endDateValue = $formData.endDate ? parseDateTime($formData.endDate) : undefined;
	});
</script>

<div class="w-full max-w-2xl self-center pb-20">
	<span class="mb-6 block text-2xl font-semibold">Create a new event</span>

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

		<Form.Field {form} name="targetAudience">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Target Audience*</Form.Label>
					<div class="flex flex-col gap-2">
						{#each targetAudienceOptions as option}
							<div class="flex items-center gap-2">
								<Checkbox
									id={option}
									checked={$formData.targetAudience?.includes(option)}
									onCheckedChange={(checked) => {
										if (!$formData.targetAudience) $formData.targetAudience = [];
										if (checked) {
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
								<label for={option} class="text-sm font-medium">
									{option.charAt(0).toUpperCase() + option.slice(1)}
								</label>
							</div>
						{/each}
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

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
									!startDateValue && 'text-muted-foreground'
								)}
							>
								{startDateValue
									? dateFormatter.format(startDateValue.toDate(getLocalTimeZone()))
									: 'Select start date and time'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									value={startDateValue as DateValue}
									bind:placeholder
									calendarLabel="Start Date"
									onValueChange={(v) => {
										if (v) {
											$formData.startDate = v.toString();
										} else {
											$formData.startDate = '';
										}
									}}
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
									!endDateValue && 'text-muted-foreground'
								)}
							>
								{endDateValue
									? dateFormatter.format(endDateValue.toDate(getLocalTimeZone()))
									: 'Select end date and time'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									value={endDateValue as DateValue}
									bind:placeholder
									calendarLabel="End Date"
									onValueChange={(v) => {
										if (v) {
											$formData.endDate = v.toString();
										} else {
											$formData.endDate = '';
										}
									}}
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
			<Form.Field {form} name="earlyAccess">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Checkbox id="earlyAccess" bind:checked={$formData.earlyAccess} />
							<Form.Label for="earlyAccess">Allow Early Access</Form.Label>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="lateAccess">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Checkbox id="lateAccess" bind:checked={$formData.lateAccess} />
							<Form.Label for="lateAccess">Allow Late Access</Form.Label>
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
			<Button type="submit" class="w-full">Create Event</Button>
		</div>
	</form>
</div>
