import type { PageServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { mapProducts } from '$lib/helpers/sql';

export const load: PageServerLoad = async ({ params }) => {
	const pool = createPool({ connectionString: POSTGRES_URL });
	const result = await pool.sql`SELECT * FROM products WHERE handle = ${params.slug}`;
	const products = mapProducts(result);
	const product = products[0];

	return {
		product
	};
};
