export const subjects = [
	'Artes',
	'Biologia',
	'Ciências',
	'Educação física',
	'Física',
	'Geografia',
	'História',
	'Matemática',
	'Português',
	'Química'
] as const;

export type SubjectNames = typeof subjects;
export type SubjectName = SubjectNames[number];

export const weekdays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado'
] as const;

export type WeekdayNames = typeof weekdays;
export type WeekdayName = WeekdayNames[number];

export function getSubject(subjectValue: number): SubjectName {
	const arrayPosition = subjectValue - 1;
	return subjects[arrayPosition];
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
});

export function formatCurrency(cost: number): string {
	return currencyFormatter.format(cost);
}
