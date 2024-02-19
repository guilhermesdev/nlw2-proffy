import type { SubjectValue } from '../../src/entities/subjects';
import { availableSubjects } from '../../src/entities/subjects';
import { getRandomFrom } from '../../src/utils/random';



export class FakeSubject {
	static generate(): SubjectValue {
		return getRandomFrom(availableSubjects);
	}
}
