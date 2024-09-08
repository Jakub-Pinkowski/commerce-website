import type { PageServerLoad } from './$types';
import { sql, createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import type { Product } from '$lib/productTypes.ts';

export const load: PageServerLoad = async () => {
	const pool = createPool({ connectionString: POSTGRES_URL });
	const result = await pool.sql`SELECT * FROM products`;

	// Map the query result rows to the Product type
	const products: Product[] = result.rows.map((row) => ({
		id: row.id,
		name: row.name,
		handle: row.handle,
		brand: row.brand,
		category: row.category,
		description: row.description,
		price: Number(row.price),
		listPrice: Number(row.listPrice),
		colors: row.colors,
		label: row.label,
		url: row.url,
		imageUrl: row.imageUrl,
		alternateImages: row.alternateImages
	}));

	return {
		products
	};
};
