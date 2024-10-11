// TODO: Change to drizzle
// TODO: Infer the types using the schema
import type { CartItem } from '$lib/stores/cart';
import type { DrizzleCart, DrizzleProduct } from '$lib/drizzle/schema';

// Add items to the localCart that are in CartItems but not in localCart
export const addProductToLocalCart = (
	localCart: CartItem[],
	dbCartItems: DrizzleCart[],
	products: DrizzleProduct[]
) => {
	for (const dbCartItem of dbCartItems) {
		const localItem = localCart.find((item) => item.id === dbCartItem.productId);
		if (!localItem) {
			const product = products.find((product) => product.id === dbCartItem.productId);
			if (product) {
				localCart.push({
					id: dbCartItem.productId,
					quantity: dbCartItem.quantity,
					name: product.name,
					handle: product.handle,
					category: product.category,
					brand: product.brand,
					description: product.description,
					price: parseFloat(product.price),
					listPrice: parseFloat(product.list_price),
					inStock: product.in_stock,
					inventoryLevel: product.inventory_level,
					reviewCount: product.review_count ?? undefined,
					reviewRating: product.review_rating ? parseFloat(product.review_rating) : undefined,
					colors: product.colors,
					label: product.label ?? undefined,
					url: product.url,
					imageUrl: product.imageurl,
					alternateImages: product.alternate_images,
					createdAt: product.created_at,
					updatedAt: product.updated_at
				});

				console.log('Adding product to localCart in SYNC');
			}
		}
	}
};
