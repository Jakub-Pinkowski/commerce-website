import type { Product } from '$lib/types/productTypes.ts';

// Map the result of a SQL query to a Product object
export function mapProducts(result: any): Product[] {
	return result.rows.map((row: any) => ({
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
