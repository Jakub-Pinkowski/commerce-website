// TODO: Add delivery address, invoice address, payment method, payment status etc.
// TODO: Change all of them to camelCase
export type Order = {
	id: number;
	userId: string;
	totalPrice: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	deliveryAddressStreet: string;
	deliveryAddressCity: string;
	deliveryAddressState: string;
	deliveryAddressPostalcode: string;
	deliveryAddressCountry: string;
	invoiceAddressStreet: string;
	invoiceAddressCity: string;
	invoiceAddressState: string;
	invoiceAddressPostalcode: string;
	invoiceAddressCountry: string;
	paymentMethod: string;
	paymentStatus: string;
	shippingMethod: string;
	trackingNumber?: string;
	points: number;
	customerNotes?: string;
};

export type OrderItem = {
	id: number;
	order_id: number;
	product_id: number;
	quantity: number;
	price: number;
};
