import type { Product } from '$lib/types/productTypes';
import type { Order, OrderItem } from '$lib/types/orderTypes';

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
	created_at: Date; // timestamp, nullable
}

interface DrizzleOrdersRow {
	id: number; // integer, not nullable
	user_id: string; // character varying, not nullable
	total_price: string; // decimal, not nullable
	status: string; // character varying, not nullable
	created_at: Date; // timestamp, nullable
}

interface DrizzleOrderItemsRow {
    id: number; // integer, not nullable
    order_id: number; // integer, not nullable
    product_id: number; // integer, not nullable
    quantity: number; // integer, not nullable
    price: string; // decimal, not nullable
}

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

export const mapOrders = (result: DrizzleOrdersRow[]): Order[] => {
    if (!result || !Array.isArray(result)) {
        console.error('Invalid result format', result);
        return [];
    }

    return result.map((row: DrizzleOrdersRow) => ({
        id: row.id,
        user_id: row.user_id,
        total_price: parseFloat(row.total_price),
        status: row.status,
        created_at: row.created_at
    }));

};

export const mapOrderItems = (result: DrizzleOrderItemsRow[]): OrderItem[] => {
    if (!result || !Array.isArray(result)) {
        console.error('Invalid result format', result);
        return [];
    }

    return result.map((row: DrizzleOrderItemsRow) => ({
        id: row.id,
        order_id: row.order_id,
        product_id: row.product_id,
        quantity: row.quantity,
        price: parseFloat(row.price)
    }));
}