import type { Elysia } from 'elysia';

import { CreateClassPage } from '../views/CreateClassPage';
import { Subject, type SubjectValue } from '../entities/subjects';
import { Time, type TimeString } from '../entities/time';
import {
	ProffiesRepository,
	type Proffy
} from '../repositories/ProffiesRepository';
import {
	ClassesRepository,
	type Class,
	type ClassScheduleValue
} from '../repositories/ClassesRepository';
import { WeekDay, type WeekdayValue } from '../entities/weekdays';
import { brazilianPhoneRegex } from '../utils/text';

function isValidHttpUrl(string: string) {
	try {
		const url = new URL(string);

		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

export function ClassesController(app: Elysia): Elysia {
	app.get('/give-classes', () => CreateClassPage());

	app.post('/save-classes', async ({ body, set }) => {
		try {
			const {
				name,
				bio,
				avatarUrl,
				cost,
				subject,
				weekdays,
				whatsapp,
				startTimeStrings,
				endTimeStrings
			} = handleBodyParams(body || {});

			const proffyValue: Omit<Proffy, 'id'> = {
				name,
				avatarUrl,
				whatsapp,
				bio
			};

			const classObject: Omit<Class, 'id'> = { subject, cost };

			const classScheduleValues: ClassScheduleValue[] = weekdays.map(
				(weekday, index) => {
					return {
						weekday,
						startAt: Time.timeStringToMinutes(startTimeStrings[index]),
						endAt: Time.timeStringToMinutes(endTimeStrings[index])
					};
				}
			);

			const { id: proffyId } = await ProffiesRepository.create(proffyValue);

			await ClassesRepository.create({
				classObject,
				classScheduleValues,
				proffyId
			});

			let queryString = `?subject=${classObject.subject}`;
			queryString += `&weekday=${weekdays[0]}`;
			queryString += `&time=${startTimeStrings[0]}`;

			set.redirect = '/study' + queryString;
		} catch (error) {
			console.error(error);
			// TODO: add error message on page using HTMX
			return CreateClassPage();
		}
	});

	return app;
}

type BodyParams = Partial<{
	name: unknown;
	avatarUrl: unknown;
	whatsapp: unknown;
	bio: unknown;
	subject: unknown;
	cost: unknown;
	'weekday[]': unknown;
	'start_at[]': unknown;
	'end_at[]': unknown;
}>;

type ParsedBodyParams = {
	name: string;
	avatarUrl: string;
	whatsapp: string;
	bio: string;
	subject: SubjectValue;
	cost: number;
	weekdays: WeekdayValue[];
	startTimeStrings: TimeString[];
	endTimeStrings: TimeString[];
};

function handleBodyParams({
	bio,
	avatarUrl,
	name,
	subject,
	...body
}: BodyParams = {}): ParsedBodyParams {
	const cost = Number(body.cost);

	if (typeof cost !== 'number' || isNaN(cost)) {
		throw new Error('Preço inválido recebido');
	}

	if (typeof bio !== 'string' || !bio.trim()) {
		throw new Error('Bio inválida recebida');
	}

	if (typeof subject !== 'string' || !Subject.isValidSubject(subject)) {
		throw new Error('Matéria inválida recebida');
	}

	if (typeof name !== 'string' || !name.trim()) {
		throw new Error('Nome inválido recebido');
	}

	if (typeof avatarUrl !== 'string' || !isValidHttpUrl(avatarUrl)) {
		throw new Error('URL inválida recebida para a foto do usuário');
	}

	const invalidWhatsAppError = new Error('WhatsApp inválido recebido');

	if (typeof body.whatsapp !== 'string') throw invalidWhatsAppError;

	const whatsapp = body.whatsapp.replace(/\D/g, '');

	if (!whatsapp || !brazilianPhoneRegex.test(whatsapp)) {
		throw invalidWhatsAppError;
	}

	const weekdaysPayload = body['weekday[]'];
	const startTimesPayload = body['start_at[]'];
	const endTimesPayload = body['start_at[]'];

	const bodyWeekdays = Array.isArray(weekdaysPayload)
		? weekdaysPayload
		: [weekdaysPayload];

	const bodyStartTimes = Array.isArray(startTimesPayload)
		? startTimesPayload
		: [startTimesPayload];

	const bodyEndTimes = Array.isArray(endTimesPayload)
		? endTimesPayload
		: [endTimesPayload];

	const weekdays = bodyWeekdays.map(Number);
	const startTimeStrings = bodyStartTimes;
	const endTimeStrings = bodyEndTimes;

	const allWeekdaysAreValid = weekdays.every(WeekDay.isValidWeekDay);

	if (!allWeekdaysAreValid) throw new Error('Dia inválido recebido');

	const allStartTimesAreValid = startTimeStrings.every(Time.isValidTimeString);
	const allEndTimesAreValid = endTimeStrings.every(Time.isValidTimeString);

	if (!allStartTimesAreValid || !allEndTimesAreValid) {
		throw new Error('Horário inválido recebido');
	}

	return {
		name,
		bio,
		avatarUrl,
		whatsapp,
		subject,
		cost,
		startTimeStrings,
		endTimeStrings,
		weekdays
	};
}
