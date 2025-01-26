import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import type {
	DrizzleUser,
	DrizzleProduct,
	DrizzleOrder,
	DrizzleOrderItem
} from '$lib/drizzle/schema';
import type { User } from '$lib/types/userTypes';
import type { Product } from '$lib/types/productTypes';
import type { Order, OrderItem } from '$lib/types/orderTypes';

const pool = createPool({ connectionString: POSTGRES_URL });
export const db = drizzle(pool);

export const mapUser = (row: DrizzleUser): User => {
	return {
		id: row.id,
		email: row.email ?? undefined,
		password: row.password_hash ?? undefined,
		githubId: row.github_id ?? undefined,
		githubUsername: row.github_username ?? undefined,
		googleId: row.google_id ?? undefined,
		googlePicture: row.google_picture ?? undefined,
		createdAt: row.created_at,
		name: row.name ?? undefined,
		phone: row.phone ?? undefined,
		address: {
			street: row.address_street ?? '',
			city: row.address_city ?? '',
			state: row.address_state ?? '',
			postalCode: row.address_postalcode ?? '',
			country: row.address_country ?? ''
		},
		points: row.points
	};
};

export const mapUserNoPassword = (row: DrizzleUser): User => {
	return {
		id: row.id,
		email: row.email ?? undefined,
		githubId: row.github_id ?? undefined,
		githubUsername: row.github_username ?? undefined,
		googleId: row.google_id ?? undefined,
		googlePicture: row.google_picture ?? undefined,
		createdAt: row.created_at,
		name: row.name ?? undefined,
		phone: row.phone ?? undefined,
		address: {
			street: row.address_street ?? '',
			city: row.address_city ?? '',
			state: row.address_state ?? '',
			postalCode: row.address_postalcode ?? '',
			country: row.address_country ?? ''
		},
		points: row.points
	};
};

export const mapProducts = (result: DrizzleProduct[]): Product[] => {
	if (!result || !Array.isArray(result)) {
		console.error('Invalid result format', result);
		return [];
	}

	const isDev = process.env.NODE_ENV === 'development';
	const baseUrl = 'http://localhost:5173/products';

	return result.map((row: DrizzleProduct) => {
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
			createdAt: row.created_at,
			updatedAt: row.created_at
		};
	});
};

export const mapOrders = (result: DrizzleOrder[]): Order[] => {
	if (!result || !Array.isArray(result)) {
		console.error('Invalid result format', result);
		return [];
	}

	return result.map((row: DrizzleOrder) => ({
		id: row.id,
		userId: row.user_id,
		totalPrice: parseFloat(row.total_price),
		status: row.status,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		deliveryAddressStreet: row.delivery_address_street,
		deliveryAddressCity: row.delivery_address_city,
		deliveryAddressState: row.delivery_address_state,
		deliveryAddressPostalcode: row.delivery_address_postalcode,
		deliveryAddressCountry: row.delivery_address_country,
		invoiceAddressStreet: row.invoice_address_street,
		invoiceAddressCity: row.invoice_address_city,
		invoiceAddressState: row.invoice_address_state,
		invoiceAddressPostalcode: row.invoice_address_postalcode,
		invoiceAddressCountry: row.invoice_address_country,
		paymentMethod: row.payment_method,
		paymentStatus: row.payment_status,
		shippingMethod: row.shipping_method,
		shippingCost: parseFloat(row.shipping_cost),
		trackingNumber: row.tracking_number ?? undefined,
		discount: parseFloat(row.discount),
		points: row.points,
		totalCost: parseFloat(row.total_cost),
		customerNotes: row.customer_notes ?? undefined
	}));
};

export const mapOrderItems = (result: DrizzleOrderItem[]): OrderItem[] => {
	if (!result || !Array.isArray(result)) {
		console.error('Invalid result format', result);
		return [];
	}

	return result.map((row: DrizzleOrderItem) => ({
		id: row.id,
		orderId: row.order_id,
		productId: row.product_id,
		quantity: row.quantity,
		price: parseFloat(row.price),
		listPrice: parseFloat(row.list_price)
	}));
};
