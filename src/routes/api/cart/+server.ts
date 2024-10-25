import { eq, and, inArray } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { usersTable, cartTable } from '$lib/drizzle/schema';

import type { RequestHandler } from '@sveltejs/kit';
import type { CartItem } from '$lib/stores/cart';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const userId = locals?.user?.id;
		if (!userId) {
			return new Response(JSON.stringify({ error: 'User not logged in' }), { status: 404 });
		}
		const { localCart }: { localCart: CartItem[] } = await request.json();

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
		}

		// Fetch all cart items from the database for the user
		const dbCartItems = await db.select().from(cartTable).where(eq(cartTable.userId, userId));

		// Remove items from the database that are not in the localCart
		const localCartProductIds = localCart.map((item) => item.id);
		for (const dbItem of dbCartItems) {
			if (!localCartProductIds.includes(dbItem.productId)) {
				await db
					.delete(cartTable)
					.where(and(eq(cartTable.userId, userId), eq(cartTable.productId, dbItem.productId)));

				console.log('Removing product from database');
			}
		}

        // Update or add items to the database that are in localCart
		for (const item of localCart) {
			const existingItem = dbCartItems.find((i) => i.productId === item.id);
			if (existingItem) {
				// Update quantity of items in the database that are in both localCart and dbCartItems
				if (existingItem.quantity !== item.quantity) {
					await db
						.update(cartTable)
						.set({ quantity: item.quantity })
						.where(and(eq(cartTable.userId, userId), eq(cartTable.productId, item.id)));

					console.log('Updating product in database');
				}
			} else {
				// Add items to the database that are in localCart but not in dbCartItems
				await db.insert(cartTable).values({
					userId,
					productId: item.id,
					quantity: item.quantity
				});

				console.log('Adding product to database');
			}
		}

		return new Response(JSON.stringify({ message: 'Cart synced with database', localCart }), {
			status: 200
		});
	} catch (error) {
		console.error('error', error);
		return new Response(JSON.stringify({ error: 'Failed to sync cart with database' }), {
			status: 500
		});
	}
};
