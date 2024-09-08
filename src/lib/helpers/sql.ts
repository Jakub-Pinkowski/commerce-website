import type { Product } from '$lib/types/productTypes.ts';

interface SQLProductRow {
	id: string;
	name: string;
	handle: string;
	category: string;
	brand: string;
	description: string;
	price: string;
	list_price: string;
	in_stock: boolean;
	inventory_level: number;
	review_count: number;
	review_rating: number;
	colors: string[];
	label: string;
	url: string;
	imageurl: string;
	alternate_images: string[];
}

// Map the result of a SQL query to a Product object
export function mapProducts(result: any): Product[] {
	if (!result || !result.rows) {
		console.error('Invalid result format', result);
		return [];
	}

	return result.rows.map((row: SQLProductRow) => ({
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
		url: row.url,
		imageUrl: row.imageurl,
		alternateImages: row.alternate_images
	}));
}
