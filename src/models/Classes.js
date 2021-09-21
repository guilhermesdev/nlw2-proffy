const Database = require('../database');

module.exports = {
	async index(subject, weekday, time) {
		const { getSubject } = require('../utils/format');

		const query = `
			SELECT classes.*, proffys.*
			FROM proffys
			JOIN classes ON (classes.proffy_id = proffys.id)
			WHERE EXISTS (
				SELECT class_schedule.*
				FROM class_schedule
				WHERE class_schedule.class_id = classes.id
				AND class_schedule.weekday = ${weekday}
				AND class_schedule.time_from <= ${time}
				AND class_schedule.time_to > ${time}
			)
			AND classes.subject = '${subject}'
		`;

		try{
			const db = await Database();
			const proffys = await db.all(query);

			const formatedProffys = proffys.map(proffy => ({...proffy, subject: getSubject(proffy.subject)}));

			await db.close();

			return formatedProffys;
		}catch(error){
			console.log(error);
		}
	},
	async create({ classValue, classScheduleValues }, proffyId) {
		const db = await Database();

		const insertedClass = await db.run(`
			INSERT INTO classes (
				subject,
				cost,
				proffy_id
			) VALUES (
				"${classValue.subject}",
				"${classValue.cost}",
				"${proffyId}"
			);
		`);

		const classId = insertedClass.lastID;

		const insertedAllClassScheduleValues = classScheduleValues.map(value => {
			return db.run(`
				INSERT INTO class_schedule (
					class_id,
					weekday,
					time_from,
					time_to
				) VALUES (
					"${classId}",
					"${value.weekday}",
					"${value.time_from}",
					"${value.time_to}"
				);
			`);
		});

		await Promise.all(insertedAllClassScheduleValues);

		await db.close();

		return classId;
	}
}