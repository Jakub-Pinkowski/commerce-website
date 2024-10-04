import type { Order } from '$lib/types/orderTypes';
export type Status = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface Threshold {
	points: number;
	bonus: string;
}

export const pointsThreshholds: Record<Status, Threshold> = {
	bronze: { points: 0, bonus: 'Access to member-only content and newsletters' },
	silver: { points: 60, bonus: '5% discount on all purchases' },
	gold: { points: 120, bonus: '10% discount on all purchases' },
	platinum: { points: 180, bonus: '15% discount on all purchases + free shipping' },
	diamond: {
		points: 240,
		bonus: '20% discount on all purchases + free shipping + exclusive offers'
	}
};

export const getCurrentStatus = (points: number) => {
	let currentStatus = 'bronze';
	for (const [status, { points: thresholdPoints }] of Object.entries(pointsThreshholds)) {
		if (points >= thresholdPoints) {
			currentStatus = status;
		} else {
			break;
		}
	}
	return currentStatus;
};

export const getNextThreshold = (points: number) => {
	for (const [status, { points: thresholdPoints }] of Object.entries(pointsThreshholds)) {
		if (points < thresholdPoints) {
			return { status, threshold: thresholdPoints };
		}
	}
	return { status: 'diamond', threshold: pointsThreshholds.diamond.points };
};

export const getStatusClass = (status: string) => {
	switch (status) {
		case 'bronze':
			return 'text-tier-bronze';
		case 'silver':
			return 'text-tier-silver';
		case 'gold':
			return 'text-tier-gold';
		case 'platinum':
			return 'text-tier-platinum';
		case 'diamond':
			return 'text-tier-diamond';
		default:
			return '';
	}
};

export const getLastMonthOrders = (orders: Order[]): Order[] => {
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
	return orders.filter((order) => new Date(order.createdAt) > oneMonthAgo);
};
