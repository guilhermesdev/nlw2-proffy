import { parseArgs } from 'util';
import { db } from '../../src/database';
import {
	classSchedulesTable,
	classesTable,
	proffiesTable
} from '../../src/database/schema';
import { FakeClass } from './FakeClass';
import { FakeClassSchedule } from './FakeClassSchedule';
import { FakeProffy } from './FakeProffy';

const { values: cliEntries } = parseArgs({
	args: Bun.argv,
	options: {
		proffies: {
			short: 'p',
			type: 'string',
			default: '20'
		}
	},
	strict: false,
	allowPositionals: true
});

const numberOfProffies = isNaN(+cliEntries.proffies!)
	? 20
	: +cliEntries.proffies!;

const proffies = Array.from({ length: +numberOfProffies }, () =>
	FakeProffy.generate()
);

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
