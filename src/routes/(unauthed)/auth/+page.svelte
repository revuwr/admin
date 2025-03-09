<script lang="ts">
	import {
		AlertDialog,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog';
	import type { PageData } from './$types.js';
	import AuthForm from './auth-form.svelte';

	let { data }: { data: PageData } = $props();

	let open = $state(true);
</script>

<AlertDialog {open}>
	<AlertDialogContent class="sm:max-w-md">
		<AlertDialogHeader>
			<AlertDialogTitle>Admin Dashboard Login</AlertDialogTitle>
			<AlertDialogDescription>Sign in to access your dashboard</AlertDialogDescription>
		</AlertDialogHeader>
		<div class="py-4">
			<AuthForm {data} bind:open />
		</div>
	</AlertDialogContent>
</AlertDialog>
