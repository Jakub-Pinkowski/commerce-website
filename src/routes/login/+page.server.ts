import { createPool } from '@vercel/postgres';
import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';

import { POSTGRES_URL } from '$env/static/private';

import { usersTable } from '$lib/drizzle/schema';
import { validateEmailAndPassword, verifyPassword, createUserSession } from '$lib/helpers/auth';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/profile');
};

export const actions: Actions = {
	default: async (event) => {
		const pool = createPool({ connectionString: POSTGRES_URL });
		const db = drizzle(pool);

		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		const validation = validateEmailAndPassword(email, password);
		if (!validation.valid) {
			return fail(400, {
				message: validation.message
			});
		}

		const existingUserQuery = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);
		const existingUser = existingUserQuery[0];

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const passwordHash = existingUser.password_hash;
		if (passwordHash === null) {
			throw new Error('Password missing from the database');
		}

		const validPassword = await verifyPassword(passwordHash, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		await createUserSession(existingUser.id, event);

		redirect(302, '/profile');
	}
};
