<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertDialog, AlertDialogContent } from '$lib/components/ui/alert-dialog';
	import { CircleAlert } from 'lucide-svelte';

	let open = $state(true);
</script>

<AlertDialog open={true}>
	<AlertDialogContent class="sm:max-w-md" escapeKeydownBehavior="ignore">
		<Alert.Root variant="destructive">
			<CircleAlert class="size-4" />
			<Alert.Title>Error {page.status}</Alert.Title>
			<Alert.Description>{page.error?.message}</Alert.Description>
		</Alert.Root>
		<span class="text-sm text-muted-foreground">
			{#if page.status === 404}
				The page you are looking for does not exist.
			{:else}
				Please retry after a few minutes.
				<br />
				If the problem persists, please contact support.
			{/if}
		</span>
	</AlertDialogContent>
</AlertDialog>
