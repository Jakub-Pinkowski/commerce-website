import { it, expect } from 'vitest';
import {
	getCurrentStatus,
	getNextThreshold,
	getStatusClass,
	getLastMonthOrders,
	getPointsStatus,
	pointsThreshholds
} from '$lib/helpers/points';

import type { Order } from '$lib/types/orderTypes';

// Mock Order type
const mockOrder = (createdAt: Date): Order => ({
	id: 1,
	userId: '1',
	totalPrice: 100,
	status: 'completed',
	createdAt,
	updatedAt: new Date(),
	deliveryAddressStreet: '123 Main St',
	deliveryAddressCity: 'Anytown',
	deliveryAddressState: 'CA',
	deliveryAddressPostalcode: '12345',
	deliveryAddressCountry: 'USA',
	invoiceAddressStreet: '123 Main St',
	invoiceAddressCity: 'Anytown',
	invoiceAddressState: 'CA',
	invoiceAddressPostalcode: '12345',
	invoiceAddressCountry: 'USA',
	paymentMethod: 'credit_card',
	paymentStatus: 'paid',
	shippingMethod: 'standard',
	shippingCost: 10,
	trackingNumber: 'TRACK123',
	discount: 5,
	points: 10,
	totalCost: 105,
	customerNotes: 'Leave at the front door'
});

const mockOrder2 = (createdAt: Date): Order => ({
	id: 2,
	userId: '2',
	totalPrice: 200,
	status: 'completed',
	createdAt,
	updatedAt: new Date(),
	deliveryAddressStreet: '456 Elm St',
	deliveryAddressCity: 'Othertown',
	deliveryAddressState: 'NY',
	deliveryAddressPostalcode: '67890',
	deliveryAddressCountry: 'USA',
	invoiceAddressStreet: '456 Elm St',
	invoiceAddressCity: 'Othertown',
	invoiceAddressState: 'NY',
	invoiceAddressPostalcode: '67890',
	invoiceAddressCountry: 'USA',
	paymentMethod: 'paypal',
	paymentStatus: 'paid',
	shippingMethod: 'express',
	shippingCost: 20,
	trackingNumber: 'TRACK456',
	discount: 10,
	points: 20,
	totalCost: 210,
	customerNotes: 'Ring the doorbell'
});

const mockOrder3 = (createdAt: Date): Order => ({
	id: 3,
	userId: '3',
	totalPrice: 300,
	status: 'pending',
	createdAt,
	updatedAt: new Date(),
	deliveryAddressStreet: '789 Oak St',
	deliveryAddressCity: 'Sometown',
	deliveryAddressState: 'TX',
	deliveryAddressPostalcode: '54321',
	deliveryAddressCountry: 'USA',
	invoiceAddressStreet: '789 Oak St',
	invoiceAddressCity: 'Sometown',
	invoiceAddressState: 'TX',
	invoiceAddressPostalcode: '54321',
	invoiceAddressCountry: 'USA',
	paymentMethod: 'bank_transfer',
	paymentStatus: 'pending',
	shippingMethod: 'standard',
	shippingCost: 15,
	trackingNumber: 'TRACK789',
	discount: 15,
	points: 30,
	totalCost: 315,
	customerNotes: 'Leave at the back door'
});

const mockOrder4 = (createdAt: Date): Order => ({
	id: 4,
	userId: '4',
	totalPrice: 400,
	status: 'completed',
	createdAt,
	updatedAt: new Date(),
	deliveryAddressStreet: '101 Pine St',
	deliveryAddressCity: 'Anycity',
	deliveryAddressState: 'FL',
	deliveryAddressPostalcode: '98765',
	deliveryAddressCountry: 'USA',
	invoiceAddressStreet: '101 Pine St',
	invoiceAddressCity: 'Anycity',
	invoiceAddressState: 'FL',
	invoiceAddressPostalcode: '98765',
	invoiceAddressCountry: 'USA',
	paymentMethod: 'credit_card',
	paymentStatus: 'paid',
	shippingMethod: 'overnight',
	shippingCost: 25,
	trackingNumber: 'TRACK101',
	discount: 20,
	points: 40,
	totalCost: 405,
	customerNotes: 'Call upon arrival'
});

it('getCurrentStatus returns correct status based on points', () => {
	expect(getCurrentStatus(0)).toBe('bronze');
	expect(getCurrentStatus(60)).toBe('silver');
	expect(getCurrentStatus(120)).toBe('gold');
	expect(getCurrentStatus(180)).toBe('platinum');
	expect(getCurrentStatus(240)).toBe('diamond');
	expect(getCurrentStatus(300)).toBe('diamond');
	expect(getCurrentStatus(59)).toBe('bronze');
	expect(getCurrentStatus(119)).toBe('silver');
	expect(getCurrentStatus(179)).toBe('gold');
	expect(getCurrentStatus(239)).toBe('platinum');
});

it('getNextThreshold returns correct next threshold based on points', () => {
	expect(getNextThreshold(0)).toEqual({ status: 'silver', threshold: 60 });
	expect(getNextThreshold(60)).toEqual({ status: 'gold', threshold: 120 });
	expect(getNextThreshold(120)).toEqual({ status: 'platinum', threshold: 180 });
	expect(getNextThreshold(180)).toEqual({ status: 'diamond', threshold: 240 });
	expect(getNextThreshold(240)).toEqual({ status: 'diamond', threshold: 240 });
	expect(getNextThreshold(300)).toEqual({ status: 'diamond', threshold: 240 });
	expect(getNextThreshold(59)).toEqual({ status: 'silver', threshold: 60 });
	expect(getNextThreshold(119)).toEqual({ status: 'gold', threshold: 120 });
	expect(getNextThreshold(179)).toEqual({ status: 'platinum', threshold: 180 });
	expect(getNextThreshold(239)).toEqual({ status: 'diamond', threshold: 240 });
});

it('getStatusClass returns correct class based on status', () => {
	expect(getStatusClass('bronze')).toBe('text-tier-bronze');
	expect(getStatusClass('silver')).toBe('text-tier-silver');
	expect(getStatusClass('gold')).toBe('text-tier-gold');
	expect(getStatusClass('platinum')).toBe('text-tier-platinum');
	expect(getStatusClass('diamond')).toBe('text-tier-diamond');
	expect(getStatusClass('unknown')).toBe('');
});

it('getLastMonthOrders returns orders from the last month', () => {
	const now = new Date();
	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 1);
	const twoMonthsAgo = new Date();
	twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

	const orders: Order[] = [
		mockOrder(now),
		mockOrder2(lastMonth),
		mockOrder3(twoMonthsAgo),
		mockOrder4(now)
	];

	expect(getLastMonthOrders(orders)).toEqual([mockOrder(now), mockOrder4(now)]);
});

it('getPointsStatus returns correct status based on createdAt date', () => {
	const now = new Date();
	const within30Days = new Date();
	within30Days.setDate(within30Days.getDate() - 29);
	const beyond30Days = new Date();
	beyond30Days.setDate(beyond30Days.getDate() - 31);

	expect(getPointsStatus(now)).toBe('Pending');
	expect(getPointsStatus(within30Days)).toBe('Pending');
	expect(getPointsStatus(beyond30Days)).toBe('Active');
});

// Additional Tests

it('getCurrentStatus handles edge cases', () => {
	expect(getCurrentStatus(-1)).toBe('bronze');
	expect(getCurrentStatus(1000)).toBe('diamond');
});

it('getNextThreshold handles edge cases', () => {
	expect(getNextThreshold(-1)).toEqual({ status: 'bronze', threshold: 60 });
	expect(getNextThreshold(1000)).toEqual({ status: 'diamond', threshold: 240 });
});

it('getStatusClass handles edge cases', () => {
	expect(getStatusClass('')).toBe('');
	expect(getStatusClass('invalid')).toBe('');
});

it('getLastMonthOrders handles empty orders array', () => {
	expect(getLastMonthOrders([])).toEqual([]);
});

it('getPointsStatus handles edge cases', () => {
	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 1);
	expect(getPointsStatus(futureDate)).toBe('Pending');
});
