// TODO: Add delivery address, invoice address, payment method, payment status etc.
export type Order = {
	id: number;
	user_id: string;
	total_price: number;
	status: string;
	created_at: Date;
};

export type OrderItem = {
	id: number;
	order_id: number;
	product_id: number;
	quantity: number;
	price: number;
};
