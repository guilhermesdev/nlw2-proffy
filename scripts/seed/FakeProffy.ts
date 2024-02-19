import { faker } from '@faker-js/faker/locale/pt_BR';

import type { Proffy } from '../../src/repositories/ProffiesRepository';
import { brazilianPhoneRegex } from '../../src/utils/text';

export class FakeProffy {
	static generate(): Proffy {
		return {
			id: crypto.randomUUID(),
			avatarUrl: faker.image.avatar(),
			name: faker.person.fullName(),
			bio: faker.person.bio(),
			whatsapp: faker.helpers.fromRegExp(brazilianPhoneRegex).replace(/\D/g, '')
		};
	}
}
