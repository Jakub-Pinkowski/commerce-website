import { productsTable } from '$lib/drizzle/schema';
import { db, mapProducts } from '$lib/helpers/drizzle';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
	const products = mapProducts(await db.select().from(productsTable));

	return {
		products
	};
};
