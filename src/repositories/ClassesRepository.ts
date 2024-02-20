import { and, eq, exists, gt, lte } from 'drizzle-orm';
import { db } from '../database';
import {
	classSchedulesTable,
	classesTable,
	proffiesTable
} from '../database/schema';

import type { Proffy } from './ProffiesRepository';
import type { WeekdayValue } from '../entities/weekdays';
import type { SubjectValue } from '../entities/subjects';

export type Class = {
	id: string;
	subject: SubjectValue;
	cost: number;
};

export type ClassWithProffyData = Class & {
	proffy: Proffy;
};

type GetAllParams = {
	subject: SubjectValue;
	weekday: WeekdayValue;
	time: number;
};

export type ClassScheduleValue = {
	weekday: WeekdayValue;
	startAt: number;
	endAt: number;
};

type CreateParams = {
	classObject: Omit<Class, 'id'>;
	classScheduleValues: ClassScheduleValue[];
	proffyId: string;
};

export class ClassesRepository {
	static async getAll({
		subject,
		weekday,
		time
	}: GetAllParams): Promise<ClassWithProffyData[]> {
		const classes = db
			.select()
			.from(classesTable)
			.leftJoin(proffiesTable, eq(proffiesTable.id, classesTable.proffyId))
			.where(
				and(
					exists(
						db
							.select()
							.from(classSchedulesTable)
							.where(
								and(
									eq(classSchedulesTable.classId, classesTable.id),
									eq(classSchedulesTable.weekday, weekday),
									lte(classSchedulesTable.startAt, time),
									gt(classSchedulesTable.endAt, time)
								)
							)
					),
					eq(classesTable.subject, subject)
				)
			)
			.all();

		return classes.map(({ classes: classObject, proffies: proffy }) => ({
			id: classObject.id,
			cost: classObject.cost,
			subject: classObject.subject,
			proffy: {
				id: proffy!.id,
				name: proffy!.name,
				bio: proffy!.bio,
				avatarUrl: proffy!.avatarUrl,
				whatsapp: proffy!.whatsapp
			}
		}));
	}

	static async create({
		classObject: { cost, subject },
		classScheduleValues,
		proffyId
	}: CreateParams) {
		const classId = await db.transaction(async (tx) => {
			const [{ classId }] = await tx
				.insert(classesTable)
				.values({ cost, subject, proffyId })
				.returning({ classId: classesTable.id });

			const classSchedulesData = classScheduleValues.map((data) => ({
				...data,
				classId
			}));

			await tx.insert(classSchedulesTable).values(classSchedulesData);

			return classId;
		});

		return classId;
	}
}
