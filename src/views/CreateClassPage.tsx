import { Subject, availableSubjects } from '../entities/subjects';
import { capitalize } from '../utils/text';
import { Layout } from './Layout';
import { ScheduleCard } from './components/ScheduleCard';

const stylesheets = ['/public/styles/partials/page-give-classes.css'];

export function CreateClassPage() {
	return (
		<Layout stylesheets={stylesheets}>
			<body id="page-give-classes">
				<template id="schedule-card-template">
					<ScheduleCard />
				</template>

				<div id="container">
					<header class="page-header">
						<div class="top-bar-container">
							<a href="/">
								<img src="/public/images/icons/back.svg" alt="Voltar" />
							</a>
							<img src="/public/images/logo.svg" alt="Proffy" />
						</div>

						<div class="header-content">
							<strong>Que incrível que você quer dar aulas.</strong>
							<p>O primeiro passo é preencher esse formulário de inscrição.</p>
						</div>
					</header>

					<main>
						<form action="/save-classes" id="create-class" method="POST">
							<fieldset>
								<legend>Seu dados</legend>

								<div class="input-block">
									<label for="name">Nome completo</label>
									<input
										name="name"
										id="name"
										type="text"
										autocomplete="name"
										required
									/>
								</div>

								<div class="input-block">
									<label for="avatar">
										Link da sua foto <small>(comece com https://)</small>
									</label>
									<input name="avatarUrl" id="avatar" type="url" required />
								</div>

								<div class="input-block">
									<label for="whatsapp">
										WhatsApp <small>(somente números)</small>
									</label>
									<input
										name="whatsapp"
										id="whatsapp"
										type="number"
										autocomplete="phone"
										required
									/>
								</div>

								<div class="textarea-block">
									<label for="bio">Biografia</label>
									<textarea name="bio" id="bio" required></textarea>
								</div>
							</fieldset>

							<fieldset>
								<legend>Sobre a aula</legend>

								<div class="select-block">
									<label for="subject">Matéria</label>
									<select name="subject" id="subject" required>
										<option value="">Selecione uma opção</option>

										{availableSubjects.map((subject) => (
											<option value={subject}>
												{capitalize(Subject.getName(subject))}
											</option>
										))}
									</select>
								</div>

								<div class="input-block">
									<label for="cost">
										Custo da sua hora/aula
										<small>(R$)</small>
									</label>
									<input
										name="cost"
										id="cost"
										type="number"
										max="999"
										required
									/>
								</div>
							</fieldset>

							<fieldset id="schedule-cards">
								<legend>
									Horários disponíveis
									<button type="button" id="add-time">
										+ Novo horário
									</button>
								</legend>

								<ScheduleCard />
							</fieldset>
						</form>

						<footer>
							<p>
								<img
									src="/public/images/icons/warning.svg"
									alt="Aviso importante"
								/>
								Importante! <br />
								Preencha todos os dados.
							</p>

							<button class="btn secondary" type="submit" form="create-class">
								Salvar cadastro
							</button>
						</footer>
					</main>
				</div>

				<script src="/public/scripts/addField.js"></script>
			</body>
		</Layout>
	);
}
