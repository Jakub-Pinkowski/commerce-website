import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq, and, inArray } from 'drizzle-orm';

import { usersTable, cartTable, productsTable } from '$lib/drizzle/schema';
import { addProductToLocalCart } from '$lib/helpers/cart';

import type { RequestHandler } from '@sveltejs/kit';
import type { CartItem } from '$lib/stores/cart';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
        console.log("POST /api/cart");
		const userId = locals?.user?.id;
		if (!userId) {
			return new Response(JSON.stringify({ error: 'User not logged in' }), { status: 404 });
		}
		const { localCart }: { localCart: CartItem[] } = await request.json();
		const pool = createPool({ connectionString: POSTGRES_URL });
		const db = drizzle(pool);

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
		}

		// Fetch all cart items from the database for the user
		const dbCartItems = await db.select().from(cartTable).where(eq(cartTable.userId, userId));

		// Fetch product details for each item in dbCartItems
		const productIds = dbCartItems.map((item) => item.productId);
		const products = await db
			.select()
			.from(productsTable)
			.where(inArray(productsTable.id, productIds));

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

        // TODO: Make this one below work
		// Add items to the localCart that are in CartItems but not in localCart
		// addProductToLocalCart(localCart, dbCartItems, products);

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
