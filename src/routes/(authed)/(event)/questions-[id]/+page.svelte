<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Resizable from '$lib/components/ui/resizable';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { GripVertical, PlusIcon, SaveIcon, TrashIcon } from 'lucide-svelte';
	import { dragHandle, dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let items = $state([
		{
			id: 1,
			text: 'Item 1'
		},
		{
			id: 2,
			text: 'Item 2'
		},
		{
			id: 3,
			text: 'Item 3'
		}
	]);

	let isDragging = $state(false);
</script>

<div class="w-full pb-20">
	<div class="mb-3 flex items-center justify-between px-4">
		<span class="block text-2xl">
			Questions of {data.event?.title}
		</span>
		<Button>
			<SaveIcon size="16" />
			Save Questions
		</Button>
	</div>

	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane class="px-4 py-1">
			<section
				class="flex flex-col gap-2"
				use:dragHandleZone={{
					items: items,
					flipDurationMs: 100
				}}
				onconsider={(e) => {
					isDragging = true;
					items = e.detail.items;
				}}
				onfinalize={(e) => {
					isDragging = false;
					items = e.detail.items;
				}}
			>
				{#each items as item (item.id)}
					<div animate:flip={{ duration: 100 }}>
						<Card.Root
							class="flex cursor-pointer transition hover:border-primary"
							onclick={() => {
								console.log('hi');
							}}
						>
							<div
								use:dragHandle
								aria-label="drag-handle for {item.text}"
								class="flex items-center justify-center"
							>
								<GripVertical class="size-6 text-muted" />
							</div>
							<div class="flex w-full flex-col">
								<div class="flex w-full justify-between py-2 pr-2">
									<Select.Root type="single">
										<Select.Trigger class="w-[180px]"></Select.Trigger>
										<Select.Content>
											<Select.Item value="light">Light</Select.Item>
											<Select.Item value="dark">Dark</Select.Item>
											<Select.Item value="system">System</Select.Item>
										</Select.Content>
									</Select.Root>
									<div>
										<Button size="icon" variant="ghost" class="text-destructive">
											<TrashIcon size="16" />
										</Button>
									</div>
								</div>
								<Separator />
								<Card.Header class="px-2 py-4">
									<Card.Title>Hello world</Card.Title>
									<Card.Description>Hello world</Card.Description>
								</Card.Header>
								<Card.Content class="p-3">
									<p>Card Content</p>
								</Card.Content>
							</div>
						</Card.Root>
						<div class="mt-2 grid grid-cols-[1fr,auto,1fr] items-center">
							<Separator orientation="horizontal" />
							<Button variant="outline" size="icon" class="h-5 w-5">
								<PlusIcon class="size-1 text-muted" />
							</Button>
							<Separator orientation="horizontal" />
						</div>
					</div>
				{/each}
			</section>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane></Resizable.Pane>
	</Resizable.PaneGroup>
</div>
