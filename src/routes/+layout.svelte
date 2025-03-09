<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Toaster } from '$lib/components/ui/sonner';
	import { i18n } from '$lib/i18n';
	import '@fontsource-variable/noto-sans-tc';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';

	let { data, children } = $props();
</script>

<Toaster />

<ParaglideJS {i18n}>
	<Sidebar.Provider open={false}>
		<AppSidebar />
		<Sidebar.Inset>
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
			>
				<div class="flex items-center gap-2 px-4">
					<Sidebar.Trigger class="-ml-1" />
					<Separator orientation="vertical" class="mr-2 h-4" />
					<Breadcrumbs />
				</div>
			</header>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
</ParaglideJS>
