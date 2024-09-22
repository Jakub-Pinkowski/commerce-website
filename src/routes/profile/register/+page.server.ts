import { createPool } from '@vercel/postgres';
import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';

import { POSTGRES_URL } from '$env/static/private';
import { generateIdFromEntropySize } from 'lucia';

import { usersTable, productsTable } from '$lib/drizzle/schema';
import { lucia } from '$lib/server/auth';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const pool = createPool({ connectionString: POSTGRES_URL });
		const db = drizzle(pool);

		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			typeof email !== 'string' ||
			email.length < 3 ||
			email.length > 31 ||
			!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			console.log('password');
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

		if (existingUser.length > 0) {
			return fail(400, {
				message: 'User already exists'
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db.insert(usersTable).values({
			id: userId,
			email: email,
			password_hash: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/profile');
	}
};
