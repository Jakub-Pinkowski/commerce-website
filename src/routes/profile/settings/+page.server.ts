import { createPool } from '@vercel/postgres';
import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

import { POSTGRES_URL } from '$env/static/private';

import { usersTable } from '$lib/drizzle/schema';
import { verifyPassword, validatePassword, hashPassword } from '$lib/helpers/auth';

import type { Actions } from './$types';

export const actions: Actions = {
	changeInfo: async (event) => {
		console.log('changeInfo');
	},

	changeAddress: async (event) => {
		console.log('changeAddress');
	},

	changePassword: async (event) => {
		const pool = createPool({ connectionString: POSTGRES_URL });
		const db = drizzle(pool);

		const formData = await event.request.formData();
		const userId = formData.get('userId');
		const oldPassword = formData.get('oldPassword');
		const newPassword = formData.get('newPassword');

		if (
			typeof userId !== 'string' ||
			typeof oldPassword !== 'string' ||
			typeof newPassword !== 'string'
		) {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		// Check if the new password is valid
		const validation = validatePassword(newPassword);
		if (!validation.valid) {
			return fail(400, {
				message: validation.message
			});
		}

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return fail(400, {
				message: 'User not found'
			});
		}

		// Check if the user has a password or they used SSO
		// TODO: Do something else in this case actually
		if (user.password_hash === null) {
			return fail(400, {
				message: 'User has no password'
			});
		}

		// Check if the old password is correct
		const validPassword = await verifyPassword(user.password_hash, oldPassword);
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect old password'
			});
		}

		// Hash the new password
		const newPasswordHash = await hashPassword(newPassword);

		// Update the user's password
		await db
			.update(usersTable)
			.set({ password_hash: newPasswordHash })
			.where(eq(usersTable.id, userId));

		redirect(302, '/profile/settings');
	}
};
