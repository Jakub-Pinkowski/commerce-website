export type Product = {
	id: string;
	name: string;
	brand: string;
	description: string;
	price: number;
	listPrice?: number;
	handle?: string;
	alternateImages?: string[];
};
