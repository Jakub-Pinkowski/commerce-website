export type User = {
	id: number;
	email: string;
    password: string;
    createdAt: Date;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
};

// TODO: Implement User Auth with Clerk
