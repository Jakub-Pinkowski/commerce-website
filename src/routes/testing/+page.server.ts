import type { PageServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { productsTable } from '$lib/drizzle/schema';

export const load: PageServerLoad = async () => {
    const pool = createPool({ connectionString: POSTGRES_URL });
    const db = drizzle(pool);
    const result = await db.select().from(productsTable).execute();
    const products = result;

    return {
        products
    };
};