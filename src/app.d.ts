// See https://svelte.dev/docs/kit/types#app.d.ts

import type { TypedPocketBase } from '$lib/pocketbase-types';
import type { AuthRecord } from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase;
			admin: AuthRecord;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
