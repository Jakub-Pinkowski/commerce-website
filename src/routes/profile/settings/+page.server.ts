import { createPool } from '@vercel/postgres';
import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

import { POSTGRES_URL } from '$env/static/private';

import { usersTable } from '$lib/drizzle/schema';
import { validateEmailAndPassword, hashPassword, createUserSession } from '$lib/helpers/auth';

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
	}
};
