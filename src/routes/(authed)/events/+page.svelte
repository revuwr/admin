<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Status from '$lib/components/status.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		ChartBarIcon,
		FileText,
		MessageSquareDiffIcon,
		PlusIcon,
		Settings2Icon
	} from '@lucide/svelte';

	let { data } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6 flex items-center justify-between">
		<span class="text-2xl font-semibold">Events</span>
		<Button onclick={() => goto(`${PUBLIC_BASE_URL}/new`)}>
			<PlusIcon class="mr-2 size-4" />
			New Event
		</Button>
	</div>

	{#if data.events && data.events.length > 0}
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Audience</TableHead>
					<TableHead>Dates</TableHead>
					<TableHead>Responses</TableHead>
					<TableHead class="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.events as event}
					<TableRow>
						<TableCell class="font-medium">{event.title}</TableCell>
						<TableCell>
							<Status type={event.status} />
						</TableCell>
						<TableCell>
							<div class="flex flex-wrap gap-1">
								{#each event.targetAudience as audience}
									<Badge variant="outline">
										{audience.charAt(0).toUpperCase() + audience.slice(1)}
									</Badge>
								{/each}
							</div>
						</TableCell>
						<TableCell>
							<div class="flex flex-col">
								<span class="text-xs text-muted-foreground">
									Start: {formatDate(event.startDate)}</span
								>
								<span class="text-xs text-muted-foreground"> End: {formatDate(event.endDate)}</span>
							</div>
						</TableCell>
						<TableCell>
							{event.responseLimit
								? `${event.serialCumulative || 0}/${event.responseLimit}`
								: event.serialCumulative || 0}
						</TableCell>
						<TableCell class="text-right">
							<div class="flex justify-end space-x-2">
								<Button
									variant="ghost"
									size="icon"
									title="Settings"
									onclick={() => goto(`${PUBLIC_BASE_URL}/settings-${event.id}`)}
								>
									<Settings2Icon class="size-4" />
								</Button>

								<Button
									variant="ghost"
									size="icon"
									title="Questions"
									onclick={() => goto(`${PUBLIC_BASE_URL}/questions-${event.id}`)}
								>
									<MessageSquareDiffIcon class="size-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									title="Responses"
									onclick={() => goto(`${PUBLIC_BASE_URL}/responses-${event.id}`)}
								>
									<ChartBarIcon class="size-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									title="Reviews"
									onclick={() => goto(`${PUBLIC_BASE_URL}/reviews-${event.id}`)}
								>
									<FileText class="size-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	{:else}
		<div class="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
			<p class="mb-4 text-lg text-muted-foreground">No events found</p>
			<Button variant="outline" onclick={() => goto(`${PUBLIC_BASE_URL}/new`)}>
				<PlusIcon class="mr-2 size-4" />
				Create your first event
			</Button>
		</div>
	{/if}
</div>
