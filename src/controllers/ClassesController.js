const Classes = require('../models/Classes');
const { subjects, weekdays, convertHoursToMinutes } = require('../utils/format');

module.exports = {
	async retriveFilteredClasses(req, res) {
		const filters = req.query;

		if (!filters.subject || !filters.weekday || !filters.time){
			return res.render('study.html', { filters, subjects, weekdays });
		}

		const timeInMinutes = convertHoursToMinutes(filters.time);

		try{
			const proffys = await Classes.index(
				filters.subject,
				filters.weekday,
				timeInMinutes
			);

			return res.render('study.html', { proffys, subjects, filters, weekdays });
		}catch(error){
			console.log(error);
		}

	}
};