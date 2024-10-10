// Define types
// TODO: Change to drizzle
interface LocalCartItem {
	id: number;
	quantity: number;
	name: string;
	handle: string;
	category: string;
	brand: string;
	description: string;
	price: number;
	listPrice: number;
	inStock: boolean;
	inventoryLevel: number;
	reviewCount?: number;
	reviewRating?: number;
	colors: string[];
	label?: string;
	url: string;
	imageUrl: string;
	alternateImages: string[];
	createdAt: Date;
	updatedAt: Date;
}

interface DBCartItem {
	userId: string;
	id: number;
	created_at: Date;
	updated_at: Date;
	productId: number;
	quantity: number;
}

interface DBProduct {
	id: number;
	name: string;
	handle: string;
	category: string;
	brand: string;
	description: string;
	price: string;
	list_price: string;
	in_stock: boolean;
	inventory_level: number;
	review_count?: number | null;
	review_rating?: string | null;
	colors: string[];
	label?: string | null;
	url: string;
	imageurl: string;
	alternate_images: string[];
	created_at: Date;
	updated_at: Date;
}

// Add items to the localCart that are in CartItems but not in localCart
export const addProductToLocalCart = (
	localCart: LocalCartItem[],
	dbCartItems: DBCartItem[],
	products: DBProduct[]
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
