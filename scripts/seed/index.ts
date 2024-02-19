import { db } from '../../src/database';
import {
	classSchedulesTable,
	classesTable,
	proffiesTable
} from '../../src/database/schema';
import { FakeClass } from './FakeClass';
import { FakeClassSchedule } from './FakeClassSchedule';
import { FakeProffy } from './FakeProffy';

const proffies = Array.from({ length: 50 }, () => FakeProffy.generate());

for (const proffy of proffies) {
	const classObject = FakeClass.generate();
	const classSchedule = FakeClassSchedule.generate();

	await db.insert(proffiesTable).values(proffy);

	await db.insert(classesTable).values({
		...classObject,
		proffyId: proffy.id
	});

	await db.insert(classSchedulesTable).values({
		...classSchedule,
		classId: classObject.id
	});
}
