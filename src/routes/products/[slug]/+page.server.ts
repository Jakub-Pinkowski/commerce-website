import { eq } from 'drizzle-orm';

import { productsTable } from '$lib/drizzle/schema';
import { db, mapProducts } from '$lib/helpers/drizzle';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const product = mapProducts(
		await db.select().from(productsTable).limit(1).where(eq(productsTable.handle, params.slug))
	)[0];

	return {
		product
	};
};
