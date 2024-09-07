import { sql, createPool } from '@vercel/postgres';

export async function load() {
    const result = await sql`SELECT * FROM products`;

	// Extract only the serializable data
	const products = result.rows;

	return {
		products
	};
}
