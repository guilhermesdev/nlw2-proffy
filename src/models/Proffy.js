const Database = require('../database');

module.exports = {
	async create(proffyValue) {
		const db = await Database();

		const insertedProffy = await db.run(`
			INSERT INTO proffys (
				name,
				avatar,
				whatsapp,
				bio
			) VALUES (
				"${proffyValue.name}",
				"${proffyValue.avatar}",
				"${proffyValue.whatsapp}",
				"${proffyValue.bio}"
			);
		`);
		
		await db.close();

		return insertedProffy.lastID;
	}
}