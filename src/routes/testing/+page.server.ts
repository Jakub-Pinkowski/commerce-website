import { sql, createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

export async function load() {
	const pool = createPool({ connectionString: POSTGRES_URL });
	const result = await pool.sql`SELECT * FROM products`;

	// Extract only the serializable data
	const products = result.rows;

	return {
		products
	};
}
