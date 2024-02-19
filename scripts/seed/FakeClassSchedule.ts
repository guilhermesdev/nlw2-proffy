import { faker } from '@faker-js/faker';
import type { TimeString } from '../../src/entities/time';
import type { ClassScheduleValue } from '../../src/repositories/ClassesRepository';
import type { WeekdayValue } from '../../src/entities/weekdays';
import { Time } from '../../src/entities/time';

export class FakeClassSchedule {
	static generate(): ClassScheduleValue {
		const [startAt, endAt] = FakeClassSchedule.#getTimes();

		return {
			weekday: faker.number.int({ min: 0, max: 6 }) as WeekdayValue,
			startAt,
			endAt
		};
	}

	static #getRandomTimeString(): TimeString {
		const hours = faker.number.float({ min: 7, max: 20, precision: 1 });
		const minutes = faker.number.float({ min: 0, max: 55, precision: 5 });

		const hoursString = hours.toString().padStart(2, '0');
		const minutesString = minutes.toString().padStart(2, '0');

		return `${hoursString}:${minutesString}` as TimeString;
	}

	static #getTimes(): [number, number] {
		const aTimeString = FakeClassSchedule.#getRandomTimeString();
		const bTimeString = FakeClassSchedule.#getRandomTimeString();

		const [startTime, endTime] = [aTimeString, bTimeString]
			.map(Time.timeStringToMinutes)
			.sort((a, b) => a - b);

		return [startTime, endTime];
	}
}
