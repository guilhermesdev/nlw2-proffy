import type { Elysia } from 'elysia';
import type { SubjectValue } from '../entities/subjects';
import type { WeekdayValue } from '../entities/weekdays';
import { Subject } from '../entities/subjects';
import { WeekDay } from '../entities/weekdays';
import { Time } from '../entities/time';
import { StudyPage } from '../views/StudyPage';
import { ClassesRepository } from '../repositories/ClassesRepository';

export function StudyPageController(app: Elysia): Elysia {
	app.get('/study', async ({ query }) => {
		try {
			const filters = handleQueryParams(query || {});

			const { subject, time, weekday } = filters;

			if (!subject || !weekday || !time) {
				return StudyPage({ classes: [], filters });
			}

			const classes = await ClassesRepository.getAll({
				subject,
				weekday,
				time
			});

			return StudyPage({ classes, filters });
		} catch (error) {
			console.log(error);
			return StudyPage({ classes: [], filters: {} });
		}
	});

	return app;
}

type QueryParams = Partial<{
	subject: unknown;
	weekday: unknown;
	time: unknown;
}>;

type ParsedQueryParams = {
	subject?: SubjectValue;
	weekday?: WeekdayValue;
	time?: number;
};

function handleQueryParams(query: QueryParams = {}): ParsedQueryParams {
	return {
		subject: getSubject(query.subject),
		weekday: getWeekday(query.weekday),
		time: getTimeString(query.time)
	};
}

function getSubject(value: unknown): SubjectValue | undefined {
	if (typeof value !== 'string') return undefined;

	return Subject.isValidSubject(value) ? value : undefined;
}

function getWeekday(value: unknown): WeekdayValue | undefined {
	const weekday = Number(value);

	if (typeof weekday !== 'number' || isNaN(weekday)) return undefined;

	return WeekDay.isValidWeekDay(weekday) ? weekday : undefined;
}

function getTimeString(value: unknown): number | undefined {
	if (typeof value !== 'string') return undefined;

	return Time.isValidTimeString(value)
		? Time.timeStringToMinutes(value)
		: undefined;
}
