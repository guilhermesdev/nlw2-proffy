const addTimeBtn = document.querySelector('#add-time');
const scheduleItems = document.querySelector('#schedule-items');
const scheduleItem = document.querySelector('.schedule-item');

const addTimeRemover = parentElement => {
	const timeRemover = document.createElement('span');

	timeRemover.textContent = '- Remover';
	timeRemover.onclick = () => timeRemover.parentNode.remove();

	timeRemover.classList.add('time-remover');
	parentElement.appendChild(timeRemover);
}

const cloneField = () => {
	const newFieldContainer = scheduleItem.cloneNode(true);
	const fields = newFieldContainer.querySelectorAll('input');

	fields.forEach(field => field.value = '');
	addTimeRemover(newFieldContainer);

	scheduleItems.appendChild(newFieldContainer);
};

addTimeBtn.addEventListener('click', cloneField);