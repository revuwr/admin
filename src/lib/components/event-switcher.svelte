<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import type { EventsResponse } from '$lib/pocketbase-types';
	import { ChevronsUpDown, FolderOpen, Plus } from 'lucide-svelte';

	// This should be `Component` after lucide-svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { teams }: { teams: { id: string; name: string; logo: any; plan: string }[] } = $props();

	const sidebar = useSidebar();

	let event = $derived(page.data.event) as EventsResponse | undefined;
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div
							class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
						>
							<FolderOpen class="size-4" />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{event?.title || ''}
							</span>
							<span class="truncate text-xs">{event?.status || ''}</span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				align="start"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				sideOffset={4}
			>
				<DropdownMenu.Label class="text-xs text-muted-foreground">Events</DropdownMenu.Label>
				{#each teams as team, index (team.id)}
					<DropdownMenu.Item
						onSelect={() => {
							goto(`${PUBLIC_BASE_URL}/event-${team.id}`);
						}}
						class="gap-2 p-2"
					>
						<div class="flex size-6 shrink-0 items-center justify-center rounded-sm border">
							<team.logo class="size-4" />
						</div>
						<span class="truncate">
							{team.name}
						</span>
					</DropdownMenu.Item>
				{/each}
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					class="gap-2 p-2"
					onSelect={() => {
						goto(`${PUBLIC_BASE_URL}/new`);
					}}
				>
					<div class="flex size-6 items-center justify-center rounded-md border bg-background">
						<Plus class="size-4" />
					</div>
					<div class="font-medium text-muted-foreground">Create new event</div>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
