import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq, and, inArray, desc } from 'drizzle-orm';

import { usersTable, cartTable, productsTable } from '$lib/drizzle/schema';

import type { RequestHandler } from '@sveltejs/kit';
import type { CartItem } from '$lib/stores/cart';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, localCart }: { userId: string; localCart: CartItem[] } = await request.json();

		console.log('userId', userId);
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

		// Create a map of productId to product details
		const productMap = new Map(products.map((product) => [product.id, product]));

		// Merge localCart with database
		// Step 1: Add items to the localCart that are in CartItems but not in localCart
		for (const dbCartItem of dbCartItems) {
			const localItem = localCart.find((item) => item.id === dbCartItem.productId);
			if (!localItem) {
				const product = productMap.get(dbCartItem.productId);
				if (product) {
					localCart.push({
						id: dbCartItem.productId,
						quantity: dbCartItem.quantity,
						name: product.name,
						handle: product.handle,
						category: product.category,
						brand: product.brand,
						description: product.description,
						price: parseFloat(product.price),
						listPrice: parseFloat(product.list_price),
						inStock: product.in_stock,
						inventoryLevel: product.inventory_level,
						reviewCount: product.review_count ?? undefined,
						reviewRating: product.review_rating ? parseFloat(product.review_rating) : undefined,
						colors: product.colors,
						label: product.label ?? undefined,
						url: product.url,
						imageUrl: product.imageurl,
						alternateImages: product.alternate_images,
						createdAt: product.created_at,
						updatedAt: product.updated_at
					});

					console.log('Adding product to localCart');
				}
			}
		}

		for (const item of localCart) {
			const existingItem = dbCartItems.find((i) => i.productId === item.id);
			if (existingItem) {
				// Step 2: Update quantity of items in the database that are in both localCart and dbCartItems
				if (existingItem.quantity !== item.quantity) {
					await db
						.update(cartTable)
						.set({ quantity: item.quantity })
						.where(and(eq(cartTable.userId, userId), eq(cartTable.productId, item.id)));

					console.log('Updating product in database');
				}
			} else {
				// Step 3: Add items to the database that are in localCart but not in dbCartItems
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
