import { Layout } from './Layout';

const stylesheets = ['/public/styles/partials/page-landing.css'];

export function HomePage() {
	return (
		<Layout stylesheets={stylesheets}>
			<body id="page-landing">
				<div id="container">
					<div class="logo-container">
						<img src="/public/images/logo.svg" alt="Proffy" />
						<h2>Sua plataforma de estudos online.</h2>
					</div>
					<img
						class="hero-image"
						src="/public/images/landing.svg"
						alt="Plataforma de estudos"
					/>
					<div class="btn-container">
						<a class="study" href="/study">
							<button class="btn primary-lighter">
								<img src="/public/images/icons/study.svg" alt="Estudar" />
								Estudar
							</button>
						</a>
						<a class="give-classes" href="/give-classes">
							<button class="btn secondary">
								<img
									src="/public/images/icons/give-classes.svg"
									alt="Dar aulas"
								/>
								Dar aulas
							</button>
						</a>
					</div>
					{/* // TODO: implement this when possible   */}
					{/* <span class="total-connections">
						Total de 285 conexões já realizadas
						<img
							src="/public/images/icons/purple-heart.svg"
							alt="Coração lilás"
						/>
					</span> */}
				</div>
			</body>
		</Layout>
	);
}
