import type { Product } from '$lib//types/productTypes.ts';

export function mapProducts(result: any): Product[] {
	return result.rows.map((row: any) => ({
		id: row.id,
		name: row.name,
		handle: row.handle,
		brand: row.brand,
		category: row.category,
		description: row.description,
		price: Number(row.price),
		listPrice: Number(row.list_price),
		colors: row.colors,
		label: row.label,
		url: row.url,
		imageUrl: row.imageurl,
		alternateImages: row.alternate_images
	}));
}
