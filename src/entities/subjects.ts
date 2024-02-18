export class Subject {
	static isValidSubject(string: string): string is SubjectValue {
		// @ts-expect-error
		return availableSubjects.includes(string);
	}

	static getName(subject: SubjectValue): string {
		return subjectNamesByValue[subject];
	}
}

export const availableSubjects = [
	'art',
	'biology',
	'science',
	'physical-education',
	'physics',
	'geography',
	'history',
	'mathematics',
	'portuguese',
	'chemistry',
	'english'
] as const;

export type AvailableSubjects = typeof availableSubjects;
export type SubjectValue = AvailableSubjects[number];

const subjectNamesByValue: Record<SubjectValue, string> = {
	art: 'artes',
	biology: 'biologia',
	science: 'ciências',
	'physical-education': 'educação física',
	physics: 'física',
	geography: 'geografia',
	history: 'história',
	mathematics: 'matemática',
	portuguese: 'português',
	chemistry: 'química',
	english: 'inglês'
} as const;
