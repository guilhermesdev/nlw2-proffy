import type { ClassWithProffyData } from '../repositories/ClassesRepository';
import type { SubjectValue } from '../entities/subjects';
import { Subject, availableSubjects } from '../entities/subjects';
import { Time } from '../entities/time';
import { weekdaysNames } from '../entities/weekdays';
import { capitalize } from '../utils/text';

import { Layout } from './Layout';
import { formatCurrency } from '../utils/format';

type StudyPageProps = {
	filters: {
		subject?: SubjectValue;
		weekday?: number;
		time?: number;
	};
	classes: ClassWithProffyData[];
};

const stylesheets = ['/public/styles/partials/page-study.css'];

function markAsSelectedIf(condition: boolean) {
	return condition ? { selected: true } : {};
}

export function StudyPage({ filters, classes }: StudyPageProps) {
	return (
		<Layout stylesheets={stylesheets}>
			<body id="page-study">
				<div id="container">
					<header class="page-header">
						<div class="top-bar-container">
							<a href="/">
								<img src="/public/images/icons/back.svg" alt="Voltar" />
							</a>
							<img src="/public/images/logo.svg" alt="Proffy" />
						</div>

						<div class="header-content">
							<strong>Esses são os proffys disponíveis.</strong>
							<form id="search-teachers" action="">
								<div class="select-block">
									<label for="subject">Matérias</label>
									<select name="subject" id="subject">
										<option value="">Selecione uma opção</option>

										{availableSubjects.map((subject) => (
											<option
												value={subject}
												{...markAsSelectedIf(filters.subject === subject)}
											>
												{capitalize(Subject.getName(subject))}
											</option>
										))}
									</select>
								</div>
								<div class="select-block">
									<label for="weekday" id="weekday">
										Dia da semana
									</label>
									<select name="weekday" id="weekday">
										<option value="">Selecione uma opção</option>

										{weekdaysNames.map((weekday, index) => (
											<option
												value={index.toString()}
												{...markAsSelectedIf(filters.weekday === index)}
											>
												{capitalize(weekday)}
											</option>
										))}
									</select>
								</div>
								<div class="input-block">
									<label for="time">Hora</label>
									<input
										name="time"
										id="time"
										type="time"
										value={
											filters.time ? Time.minutesToTimeString(filters.time) : ''
										}
									/>
								</div>
								<button class="btn secondary" type="submit">
									Filtrar
								</button>
							</form>
						</div>
					</header>

					<main>
						{classes.length === 0 ? (
							<p class="no-results">
								Nenhum professor encontrado com a sua pesquisa.
							</p>
						) : (
							classes.map(({ proffy, cost, subject }) => (
								<article class="teacher-item">
									<header>
										<img src={proffy.avatarUrl} alt={proffy.name} />
										<div>
											<strong>{proffy.name}</strong>
											<span>{capitalize(Subject.getName(subject))}</span>
										</div>
									</header>
									<p>{proffy.bio}</p>
									<footer>
										<p>
											Preço/hora<strong>{formatCurrency(cost)}</strong>
										</p>
										<a
											href={`https://api.whatsapp.com/send?1=pt_BR%phone=55${proffy.whatsapp}&text=Olá, ${proffy.name}, tenho interesse na sua aula de ${subject}!`}
											target="_blank"
											class="button btn secondary"
										>
											<img
												src="/public/images/icons/whatsapp.svg"
												alt="WhatsApp"
											/>
											Entrar em contato
										</a>
									</footer>
								</article>
							))
						)}
					</main>
				</div>
			</body>
		</Layout>
	);
}
