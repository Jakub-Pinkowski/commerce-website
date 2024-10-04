export type Product = {
	id: number;
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
};

// TODO: Change create_at to mandatory