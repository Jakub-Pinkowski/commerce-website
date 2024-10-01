import { redirect } from '@sveltejs/kit';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq, inArray } from 'drizzle-orm';

import { ordersTable, orderItemsTable } from '$lib/drizzle/schema';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	const pool = createPool({ connectionString: POSTGRES_URL });
	const db = drizzle(pool);

	const user = event.locals.user;

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

	return {
		user,
        orders: formattedOrders,
        orderItems: formattedOrderItems
	};
};
