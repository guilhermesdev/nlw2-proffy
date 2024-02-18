import type { IntRange } from '../utils/types';

export class Time {
	static isValid(number: number) {
		// * 1439 === 23h59 in minutes (23 * 60 + 59)
		return number >= 0 && number <= 1439;
	}

	static isValidTimeString(string: string): string is TimeString {
		const stringSplitArray = string
			.split(':')
			.map((str) => str.trim())
			.filter(Boolean);

		if (stringSplitArray.length !== 2) return false;

		const [hour, minutes] = stringSplitArray;

		if (!hour || !minutes) return false;
		if (hour.length !== 2 || minutes.length !== 2) return false;

		const hourAsNumber = +hour;
		const minutesAsNumber = +minutes;

		if (hourAsNumber < 0 || hourAsNumber > 23) return false;
		if (minutesAsNumber < 0 || minutesAsNumber > 59) return false;

		return true;
	}

	static minutesToTimeString(minutes: number): TimeString {
		const hourString = Math.floor(minutes / 60)
			.toString()
			.padStart(2, '0') as HourString;

		const minuteString = (minutes % 60)
			.toString()
			.padStart(2, '0') as MinuteString;

		return `${hourString}:${minuteString}`;
	}

	static timeStringToMinutes(time: TimeString): number {
		const [hour, minutes] = time.split(':').map(Number);

		return hour * 60 + minutes;
	}
}

type PadZeroStart<T extends number> = T extends IntRange<0, 9>
	? `0${T}`
	: `${T}`;

type HourString = PadZeroStart<IntRange<0, 23>>;
type MinuteString = PadZeroStart<IntRange<0, 59>>;

export type TimeString = `${HourString}:${MinuteString}`;
