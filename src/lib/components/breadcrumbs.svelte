<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import type { EventsResponse } from '$lib/pocketbase-types';

	type Crumb = {
		label: string;
		url: string;
	};

	let event: EventsResponse | undefined = $derived(page.data.event);

	const crumbs: Crumb[] = $derived([]);
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item class="hidden md:block">
			<Breadcrumb.Link href={`${PUBLIC_BASE_URL}/`}>Admin</Breadcrumb.Link>
		</Breadcrumb.Item>

		{#each crumbs as { label, url }, index}
			<Breadcrumb.Separator class="hidden md:block" />

			<Breadcrumb.Item class="hidden md:block">
				<Breadcrumb.Link href={`${PUBLIC_BASE_URL}/${url}`}>
					<div class="max-w-64 truncate capitalize">
						{label}
					</div>
				</Breadcrumb.Link>
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
