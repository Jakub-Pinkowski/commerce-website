import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	boolean,
	numeric,
	integer,
	jsonb
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: serial('id').notNull(),
	name: text('name').notNull(),
	handle: text('handle').notNull(),
	category: text('category').notNull(),
	brand: text('brand').notNull(),
	description: text('description').notNull(),
	price: numeric('price').notNull(),
	list_price: numeric('list_price').notNull(),
	in_stock: boolean('in_stock').notNull(),
	inventory_level: integer('inventory_level').notNull(),
	review_count: integer('review_count'),
	review_rating: numeric('review_rating'),
	colors: text('colors').notNull(),
	label: text('label'),
	url: text('url').notNull(),
	imageurl: text('imageurl').notNull(),
	alternate_images: jsonb('alternate_images').notNull()
});

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	password_hash: text('password_hash').notNull()
});
