const $addTimeButton = document.querySelector('#add-time');
const $scheduleCardsWrapper = document.querySelector('#schedule-cards');
const $scheduleCardTemplate = document.getElementById('schedule-card-template');

function addTimeRemoverTo(parentElement) {
	const timeRemover = document.createElement('span');

	timeRemover.textContent = '- Remover';
	timeRemover.classList.add('time-remover');
	timeRemover.addEventListener('click', () => timeRemover.parentNode.remove());

	parentElement.appendChild(timeRemover);
}

function addNewScheduleCard() {
	const $scheduleCard =
		$scheduleCardTemplate.content.firstChild.cloneNode(true);

	addTimeRemoverTo($scheduleCard);

	$scheduleCardsWrapper.appendChild($scheduleCard);
}

$addTimeButton.addEventListener('click', addNewScheduleCard);
