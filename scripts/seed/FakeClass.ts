import { faker } from '@faker-js/faker/locale/pt_BR';

import type { Class } from '../../src/repositories/ClassesRepository';
import { FakeSubject } from './FakeSubject';

export class FakeClass {
	static generate(): Class {
		return {
			id: crypto.randomUUID(),
			cost: faker.number.float({ min: 50, max: 300, precision: 5 }),
			subject: FakeSubject.generate()
		};
	}
}
