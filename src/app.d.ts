// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '$lib/types/userTypes';
import type { DrizzleSession } from '$lib/drizzle/schema';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: DrizzleSession | null;
		}
	}
}

export {};
