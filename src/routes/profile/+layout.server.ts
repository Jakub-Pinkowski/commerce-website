import { redirect } from '@sveltejs/kit';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq, inArray } from 'drizzle-orm';

import { ordersTable, orderItemsTable, productsTable } from '$lib/drizzle/schema';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	const pool = createPool({ connectionString: POSTGRES_URL });
	const db = drizzle(pool);

	const user = event.locals.user;
    const isDev = process.env.NODE_ENV === 'development';

	// Fetch orders for the user
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.user_id, user.id));
	const formattedOrders = orders.map((order) => ({
		...order,
		total_price: parseFloat(order.total_price)
	}));

	// Extract order IDs
	const orderIds = orders.map((order) => order.id);

	// Fetch order items for the user's orders
	const orderItems = await db
		.select()
		.from(orderItemsTable)
		.where(inArray(orderItemsTable.order_id, orderIds));
	const formattedOrderItems = orderItems.map((item) => ({
		...item,
		price: parseFloat(item.price)
	}));

	// Fetch all the products for the order items
	const productIds = orderItems.map((item) => item.product_id);

	const products = await db
		.select()
		.from(productsTable)
		.where(inArray(productsTable.id, productIds));
	// Map products to match the Product type
    const baseUrl = 'http://localhost:5173/products';
	const formattedProducts = products.map((product) => ({
		id: product.id,
		name: product.name,
		description: product.description,
		brand: product.brand,
		handle: product.handle,
		category: product.category,
		price: parseFloat(product.price),
		listPrice: parseFloat(product.list_price),
		inStock: product.in_stock,
		inventoryLevel: product.inventory_level,
		reviewCount: product.review_count ?? undefined, // Convert null to undefined
		reviewRating: parseFloat(product.review_rating ?? '0'), // Convert to number, default to '0' if null
		colors: typeof product.colors === 'string' ? product.colors.split(',') : product.colors, // Convert to array of strings
		label: product.label ?? undefined, // Convert null to undefined
        url: isDev ? `${baseUrl}/${product.handle}` : product.url, // Corrected property name
		imageUrl: product.imageurl, // Corrected property name
		alternateImages: Array.isArray(product.alternate_images) ? product.alternate_images : [] // Ensure it's an array of strings
	}));

	console.log('formattedProducts', formattedProducts);

	return {
		user,
		orders: formattedOrders,
		orderItems: formattedOrderItems,
		products: formattedProducts
	};
};
