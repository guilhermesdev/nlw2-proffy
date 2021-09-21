const Database = require('./index');

(async () => {
		const db = await Database();

		await db.exec(`
			CREATE TABLE IF NOT EXISTS proffys (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT,
				avatar TEXT,
				whatsapp TEXT,
				bio TEXT
			);

			CREATE TABLE IF NOT EXISTS classes (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				subject INTEGER,
				cost TEXT,
				proffy_id INTEGER,
				FOREIGN KEY(proffy_id) REFERENCES proffys(id)
			);

			CREATE TABLE IF NOT EXISTS class_schedule (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				class_id INTEGER,
				weekday INTEGER,
				time_from INTEGER,
				time_to INTEGER,
				FOREIGN KEY(class_id) REFERENCES classes(id)
			);
		`);

		await db.close();
})();