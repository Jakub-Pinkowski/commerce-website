export const pointsThreshholds = {
	bronze: 0,
	silver: 60,
	gold: 120,
	platinum: 180,
	diamond: 240
};

export const getCurrentStatus = (points: number) => {
	let currentStatus = 'bronze';
	for (const [status, threshold] of Object.entries(pointsThreshholds)) {
		if (points >= threshold) {
			currentStatus = status;
		} else {
			break;
		}
	}
	return currentStatus;
};

export const getNextThreshold = (points: number) => {
	for (const [status, threshold] of Object.entries(pointsThreshholds)) {
		if (points < threshold) {
			return { status, threshold };
		}
	}
	return { status: 'diamond', threshold: pointsThreshholds.diamond };
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
