import { eq } from 'drizzle-orm';

import { productsTable } from '$lib/drizzle/schema';
import { db, mapProducts } from '$lib/helpers/drizzle';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const productQuery = mapProducts(
		await db.select().from(productsTable).where(eq(productsTable.handle, params.slug))
	);
	const product = productQuery[0];

	console.log('product', product);

	return {
		product
	};
};
