import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { SubjectValue } from '../entities/subjects';
import type { WeekdayValue } from '../entities/weekdays';
import { relations } from 'drizzle-orm';

const generateId = () => crypto.randomUUID();

export const proffiesTable = sqliteTable('proffies', {
	id: text('id').primaryKey().$defaultFn(generateId),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url').notNull(),
	bio: text('bio').notNull(),
	whatsapp: text('whatsapp').notNull()
});

export const classesTable = sqliteTable('classes', {
	id: text('id').primaryKey().$defaultFn(generateId),
	subject: text('subject').$type<SubjectValue>().notNull(),
	cost: integer('cost').notNull(),
	proffyId: text('proffy_id')
		.references(() => proffiesTable.id)
		.notNull()
});

export const classSchedulesTable = sqliteTable('class_schedules', {
	id: text('id').primaryKey().$defaultFn(generateId),
	weekday: integer('weekday').$type<WeekdayValue>().notNull(),
	startAt: integer('start_at').notNull(),
	endAt: integer('end_at').notNull(),
	classId: text('class_id')
		.references(() => classesTable.id)
		.notNull()
});

export const proffiesRelations = relations(proffiesTable, ({ many }) => ({
	classes: many(classesTable)
}));

export const classesRelations = relations(classesTable, ({ one, many }) => ({
	proffy: one(proffiesTable, {
		fields: [classesTable.proffyId],
		references: [proffiesTable.id]
	}),
	classSchedules: many(classSchedulesTable)
}));

export const classSchedulesRelation = relations(
	classSchedulesTable,
	({ one }) => ({
		class: one(classesTable, {
			fields: [classSchedulesTable.classId],
			references: [classesTable.id]
		})
	})
);
