import type { Product } from '$lib/types/productTypes';

interface DrizzleProductRow {
	id: number; // integer, not nullable
	name: string; // character varying, not nullable
	handle: string; // character varying, not nullable
	category: string; // character varying, not nullable
	brand: string; // character varying, not nullable
	description: string; // text, not nullable
	price: string; // decimal, not nullable
	list_price: string; // decimal, not nullable
	in_stock: boolean; // boolean, not nullable
	inventory_level: number; // integer, not nullable
	review_count: number | null; // integer, nullable
	review_rating: string | null; // decimal, nullable
	colors: string[]; // array, not nullable
	label: string | null; // character varying, nullable
	url: string; // character varying, not nullable
	imageurl: string; // character varying, not nullable
	alternate_images: string[]; // array, not nullable
	created_at: Date | null; // timestamp, nullable
}

interface DrizzleOrdersProductRow {}

interface DrizzleOrderItemsRow {}

export const mapProducts = (result: DrizzleProductRow[]): Product[] => {
	if (!result || !Array.isArray(result)) {
		console.error('Invalid result format', result);
		return [];
	}

	const isDev = process.env.NODE_ENV === 'development';
	const baseUrl = 'http://localhost:5173/products';

	return result.map((row: DrizzleProductRow) => {
		const url = isDev ? `${baseUrl}/${row.handle}` : row.url;

		return {
			id: row.id,
			name: row.name,
			handle: row.handle,
			category: row.category,
			brand: row.brand,
			description: row.description,
			price: parseFloat(row.price),
			listPrice: parseFloat(row.list_price),
			inStock: row.in_stock,
			inventoryLevel: row.inventory_level,
			reviewCount: row.review_count ?? undefined,
			reviewRating: row.review_rating != null ? parseFloat(row.review_rating.toString()) : 0,
			colors: row.colors,
			label: row.label ?? undefined,
			url,
			imageUrl: row.imageurl,
			alternateImages: row.alternate_images,
			createdAt: row.created_at
		};
	});
};
