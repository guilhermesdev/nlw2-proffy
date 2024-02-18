import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { db } from '../src/database';

await migrate(db, {
	migrationsFolder: 'drizzle'
});
