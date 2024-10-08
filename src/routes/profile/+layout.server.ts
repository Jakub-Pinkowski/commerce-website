import { redirect } from '@sveltejs/kit';
import { eq, inArray } from 'drizzle-orm';

import { ordersTable, orderItemsTable, productsTable } from '$lib/drizzle/schema';
import { db, mapProducts, mapOrders, mapOrderItems } from '$lib/helpers/drizzle';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');

	const user = event.locals.user;

	// Fetch, format and sort orders for the user
	const orders = mapOrders(
		await db.select().from(ordersTable).where(eq(ordersTable.user_id, user.id))
	).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	// Extract order IDs and fetch order items
	const orderIds = orders.map((order) => order.id);
	const orderItems = mapOrderItems(
		await db.select().from(orderItemsTable).where(inArray(orderItemsTable.order_id, orderIds))
	);

	// Extract product IDs and fetch products
	const productIds = orderItems.map((item) => item.productId);
	const products = mapProducts(
		await db.select().from(productsTable).where(inArray(productsTable.id, productIds))
	);

	return {
		user,
		orders,
		orderItems,
		products
	};
};
