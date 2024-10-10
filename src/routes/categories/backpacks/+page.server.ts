import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

import { productsTable } from '$lib/drizzle/schema';
import { db, mapProducts } from '$lib/helpers/drizzle';

export const load: PageServerLoad = async () => {
	const products = mapProducts(
		await db.select().from(productsTable).where(eq(productsTable.category, 'backpacks'))
	);

	return {
		products
	};
}
