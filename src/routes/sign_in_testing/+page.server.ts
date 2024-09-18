import type { PageServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { userTable, productsTable } from '$lib/drizzle/schema';
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';

import type { Actions } from './$types';

export const load: PageServerLoad = async () => {};

export const actions: Actions = {
	default: async (event) => {
		const pool = createPool({ connectionString: POSTGRES_URL });
		const db = drizzle(pool);

		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db
			.select(userTable)
			.where(userTable.username.equals(username))
			.one();
	}
};
