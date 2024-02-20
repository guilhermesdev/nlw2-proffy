import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';

import { ClassesController } from './controllers/ClassesController';
import { StudyPageController } from './controllers/StudyPageController';
import { HomePage } from './views/HomePage';
import { CreateClassPage } from './views/CreateClassPage';

const PORT = Bun.env['PORT'] || 5000;

new Elysia()
	.use(html())
	.use(staticPlugin())
	.get('/study', StudyPageController.show)
	.get('/give-classes', () => CreateClassPage())
	.post('/save-classes', ClassesController.createClass)
	.get('/', () => HomePage())
	.listen(PORT, ({ hostname, port }) =>
		console.log(`Running at http://${hostname}:${port}`)
	);
