import type { PageServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { mapProducts } from '$lib/helpers/sql';

export const load: PageServerLoad = async ({ params }) => {
	const pool = createPool({ connectionString: POSTGRES_URL });
	const result = await pool.sql`SELECT * FROM products`;

	// Map the query result rows to the Product type
	const products = mapProducts(result);

	const product = products.find((p) => p.handle === params.slug);

	return {
		product
	};
};
