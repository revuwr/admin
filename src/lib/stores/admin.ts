import type { AuthModel } from 'pocketbase';
import { writable } from 'svelte/store';

export const admin = writable<AuthModel | null>(null);
