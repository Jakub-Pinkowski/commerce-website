import { writable } from 'svelte/store';

import type { User } from '$lib/types/userTypes.ts';

export const user = writable<User | null>(null);