import { createPool } from '@vercel/postgres';
import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';

import { POSTGRES_URL } from '$env/static/private';

import { usersTable } from '$lib/drizzle/schema';
import { lucia } from '$lib/server/auth';

import type { Actions } from './$types';

// Validate the email and the password
const validateEmailAndPassword = (
	email: string,
	password: string
): { valid: boolean; message?: string } => {
	if (
		email.length < 3 ||
		email.length > 31 ||
		!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	) {
		return { valid: false, message: 'Invalid email' };
	}
	if (
		password.length < 8 ||
		password.length > 255 ||
		!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,255}$/.test(password)
	) {
		return { valid: false, message: 'Invalid password' };
	}
	return { valid: true };
};

// Hash the password
const hashPassword = async (password: string): Promise<string> => {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
};

// Create a user session and set the session cookie
const createUserSession = async (userId: string, event: any): Promise<void> => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
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

		const existingUserQuery = await db.select().from(usersTable).where(eq(usersTable.email, email));
		const existingUser = existingUserQuery[0];

		if (existingUser) {
			if (existingUser.google_id !== null) {
				// TODO: Inform user that their account has been merged with Google
				const passwordHash = await hashPassword(password);

				await db
					.update(usersTable)
					.set({ password_hash: passwordHash })
					.where(eq(usersTable.id, existingUser.id));

				await createUserSession(existingUser.id, event);

				redirect(302, '/profile');
			} else {
				return fail(400, {
					message: 'User already exists'
				});
			}
		}

		const userId = generateIdFromEntropySize(10);
		const passwordHash = await hashPassword(password);

		await db.insert(usersTable).values({
			id: userId,
			email: email,
			password_hash: passwordHash
		});

		await createUserSession(userId, event);

		redirect(302, '/profile');
	}
};
