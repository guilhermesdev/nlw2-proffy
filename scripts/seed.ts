import { db } from '../src/database';
import {
	classSchedulesTable,
	classesTable,
	proffiesTable
} from '../src/database/schema';

const proffyNames = [
	'Alan Turing',
	'Ada Lovelace',
	'Linus Torvald',
	'Osamu Tezuka'
];

for (const name of proffyNames) {
	const proffyId = crypto.randomUUID();
	const classId = crypto.randomUUID();

	await db.insert(proffiesTable).values({
		id: proffyId,
		name,
		avatarUrl: `https://source.unsplash.com/random?person+${name}`,
		bio: 'lorem ipsum dolor cit amet',
		whatsapp: '11912345678'
	});

	await db.insert(classesTable).values({
		id: classId,
		subject: 'portuguese',
		cost: 10000,
		proffyId
	});

	await db.insert(classSchedulesTable).values({
		startAt: 0,
		endAt: 1439,
		weekday: 1,
		classId
	});
}
