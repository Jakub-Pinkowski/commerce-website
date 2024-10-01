export type User = {
	id?: string;
	email?: string;
	password?: string;
	github_id?: number;
	github_username?: string;
	google_id?: string;
	google_picture?: string;
	created_at: Date;
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
