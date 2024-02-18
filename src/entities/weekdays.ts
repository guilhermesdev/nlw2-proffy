import type { IntRange } from '../utils/types';

export class WeekDay {
	static isValidWeekDay(number: number): number is WeekdayValue {
		return number >= 0 && number <= 6;
	}
}

export type WeekdayValue = IntRange<0, 6>;

export const weekdaysNamesByValue = {
	0: 'domingo',
	1: 'segunda-feira',
	2: 'terça-feira',
	3: 'quarta-feira',
	4: 'quinta-feira',
	5: 'sexta-feira',
	6: 'sábado'
} as const satisfies Record<WeekdayValue, string>;

export const weekdaysNames = Object.values(weekdaysNamesByValue);
export type WeekdaysNames = typeof weekdaysNames;
