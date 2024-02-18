import { db } from '../database';
import { proffiesTable } from '../database/schema';

export type Proffy = {
	id: string;
	name: string;
	avatarUrl: string;
	whatsapp: string;
	bio: string;
};

export class ProffiesRepository {
	static async create({
		name,
		bio,
		avatarUrl,
		whatsapp
	}: Omit<Proffy, 'id'>): Promise<Proffy> {
		const [insertedProffy] = await db
			.insert(proffiesTable)
			.values({ name, bio, avatarUrl, whatsapp })
			.returning();

		return insertedProffy;
	}
}
