import { weekdaysNames } from '../../entities/weekdays';
import { capitalize } from '../../utils/text';

// TODO: add validation to ensure that users won't submit the form with a invalid time range (ex: 23:00-22:00)
export function ScheduleCard() {
	return (
		<div class="schedule-card">
			<div class="select-block">
				<label for="weekday">Dia da semana</label>
				<select name="weekday[]" id="weekday" required>
					<option value="">Selecione uma opção</option>

					{weekdaysNames.map((weekday, index) => (
						<option value={index.toString()}>{capitalize(weekday)}</option>
					))}
				</select>
			</div>

			<div class="input-block">
				<label for="start_at">Das</label>
				<input type="time" name="start_at[]" required />
			</div>

			<div class="input-block">
				<label for="end_at">Até</label>
				<input type="time" name="end_at[]" required />
			</div>
		</div>
	);
}

