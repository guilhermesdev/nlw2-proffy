const express = require('express');
const nunjucks = require('nunjucks');

const ClassesController = require('./controllers/ClassesController');
const ProffyController = require('./controllers/ProffyController');

const app = express();
const PORT = process.env.PORT || 5000;

const { subjects, weekdays } = require('./utils/format');

nunjucks.configure('src/views', {
	express: app,
	noCache: true
});

app
	.use(express.urlencoded({ extended: true }))
	.use(express.static("public"));

app.get('/', (_req, res) => res.render('index.html'));
app.get('/give-classes', (_req, res) => res.render('give-classes.html', { subjects, weekdays }));
app.post('/save-classes', ProffyController.saveClasses);
app.get('/study', ClassesController.retriveFilteredClasses);

app.listen(PORT, () => `Server is running at http://localhost:${PORT}`);