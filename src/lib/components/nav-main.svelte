<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let {
		title,
		items,
		disabled
	}: {
		title: string;
		items: {
			title: string;
			url: string;
			// this should be `Component` after lucide-svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
		disabled?: boolean;
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel class="overflow-hidden">
		{title}
	</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton onclick={() => goto(mainItem.url)} {disabled}>
					{#snippet tooltipContent()}
						{mainItem.title}
					{/snippet}
					{#if mainItem.icon}
						<mainItem.icon />
					{/if}
					<span>{mainItem.title}</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
