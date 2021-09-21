const { convertHoursToMinutes } = require('../utils/format');

module.exports = {
	async saveClasses(req, res) {
		const Proffy = require('../models/Proffy');
		const Classes = require('../models/Classes');
	
		const {
			name,
			avatar,
			whatsapp,
			bio,
			subject,
			cost,
			weekday,
			time_from,
			time_to
		} = req.body;
	
		const proffyValue = {
			name,
			avatar,
			whatsapp,
			bio
		};
	
		const classValue = {
			subject,
			cost
		};

		const classScheduleValues = weekday.map((weekday, index) => {
			return {
				weekday,
				time_from: convertHoursToMinutes(time_from[index]),
				time_to: convertHoursToMinutes(time_to[index])
			};
		});

		try{
			const proffyId = await Proffy.create(proffyValue);
			await Classes.create({ classValue, classScheduleValues }, proffyId);

			let queryString = `?subject=${subject}`;
					queryString += `&weekday=${weekday[0]}`;
					queryString += `&time=${time_from[0]}`;
	
			return res.redirect(`/study${queryString}`);
		}catch(error){
			console.log(error);
		}
	}
}