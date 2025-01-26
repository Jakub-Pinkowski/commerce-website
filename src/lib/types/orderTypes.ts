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
	shippingCost: number;
	trackingNumber?: string;
	discount: number;
	points: number;
	totalCost: number;
	customerNotes?: string;
};

export type OrderItem = {
	id: number;
	orderId: number;
	productId: number;
	quantity: number;
	price: number;
	listPrice: number;
};
