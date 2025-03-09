<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import EventSwitcher from '$lib/components/event-switcher.svelte';
	import NavMain from '$lib/components/nav-main.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { EventsResponse } from '$lib/pocketbase-types';
	import {
		FileText,
		FolderIcon,
		FoldersIcon,
		MessageSquare,
		MessageSquareDiff,
		Settings2,
		UsersIcon
	} from 'lucide-svelte';
	import { type ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	let admin = $derived(page.data.admin) as { name: string; email: string; avatar: string } | null;
	let events = $derived(page.data.events) as EventsResponse[] | undefined;
	let event = $derived(page.data.event) as EventsResponse | undefined;

	const eventNavItems = $derived([
		{
			title: 'Settings',
			url: `${PUBLIC_BASE_URL}/settings-${event?.id}`,
			icon: Settings2
		},
		{
			title: 'Questions',
			url: `${PUBLIC_BASE_URL}/questions-${event?.id}`,
			icon: MessageSquareDiff
		},
		{
			title: 'Responses',
			url: `${PUBLIC_BASE_URL}/responses-${event?.id}`,
			icon: MessageSquare
		},
		{
			title: 'Reviews',
			url: `${PUBLIC_BASE_URL}/reviews-${event?.id}`,
			icon: FileText
		}
	]);

	const platformNavItems = [
		{
			title: 'All Events',
			url: `${PUBLIC_BASE_URL}/events`,
			icon: FoldersIcon,
			isActive: false
		},
		{
			title: 'All Users',
			url: `${PUBLIC_BASE_URL}/users`,
			icon: UsersIcon,
			isActive: false
		}
	];
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<EventSwitcher
			teams={(events || []).map((event: EventsResponse) => ({
				id: event.id,
				name: event.title,
				logo: FolderIcon,
				plan: event.status
			}))}
		/>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain
			title={event?.title || 'Select an event'}
			items={eventNavItems}
			disabled={event === undefined}
		/>
		<NavMain title="Platform" items={platformNavItems} />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if admin}
			<NavUser
				user={{
					name: admin.name,
					email: admin.email,
					avatar: admin.avatar
				}}
			/>
		{/if}
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
