import type { Product } from '$lib/types/productTypes';
// TODO: Convert to Drizzle at some point

interface SQLProductRow {
	id: number; // integer, not nullable
	name: string; // character varying, not nullable
	handle: string; // character varying, not nullable
	category: string; // character varying, not nullable
	brand: string; // character varying, not nullable
	description: string; // text, not nullable
	price: number; // numeric, not nullable
	list_price: number; // numeric, not nullable
	in_stock: boolean; // boolean, not nullable
	inventory_level: number; // integer, not nullable
	review_count?: number; // integer, nullable
	review_rating?: number; // numeric, nullable
	colors: string; // character varying, not nullable
	label?: string; // character varying, nullable
	url: string; // character varying, not nullable
	imageurl: string; // character varying, not nullable
	alternate_images: any[]; // jsonb, not nullable
}

// Map the result of a SQL query to a Product object
export const mapProducts = (result: any): Product[] => {
	if (!result || !result.rows) {
		console.error('Invalid result format', result);
		return [];
	}

	const isDev = process.env.NODE_ENV === 'development';

	return result.rows.map((row: SQLProductRow) => {
		const baseUrl = 'http://localhost:5173/products';
		const url = isDev ? `${baseUrl}/${row.handle}` : row.url;

		return {
			id: row.id,
			name: row.name,
			handle: row.handle,
			category: row.category,
			brand: row.brand,
			description: row.description,
			price: Number(row.price),
			listPrice: Number(row.list_price),
			inStock: row.in_stock,
			inventoryLevel: row.inventory_level,
			reviewCount: row.review_count,
			reviewRating: row.review_rating,
			colors: row.colors,
			label: row.label,
			url: url,
			imageUrl: row.imageurl,
			alternateImages: row.alternate_images
		};
	});
}
