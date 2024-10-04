// TODO: Change all of them to camelCase
export type User = {
	id?: string;
	email?: string;
	password?: string;
	githubId?: number;
	githubUsername?: string;
	googleId?: string;
	googlePicture?: string;
	createdAt: Date;
	name?: string;
	phone?: string;
	address?: {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
	points: number;
};

export type Address = {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
};
