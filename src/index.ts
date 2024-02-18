import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';

import { HomePage } from './views/HomePage';
import { ClassesController } from './controllers/ClassesController';
import { StudyPageController } from './controllers/StudyPageController';

const PORT = Bun.env['PORT'] || 5000;

new Elysia()
	.use(html())
	.use(staticPlugin())
	.use(StudyPageController)
	.use(ClassesController)
	.get('/', () => HomePage())
	.listen(PORT, ({ hostname, port }) =>
		console.log(`Running at http://${hostname}:${port}`)
	);
