import type { PropsWithChildren } from 'beth-stack/jsx';

type LayoutProps = {
	stylesheets?: string[];
} & PropsWithChildren;

export function Layout({ children, stylesheets = [] }: LayoutProps) {
	return (
		<html lang="pt_br">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#8257e5" />

				<title>Proffy | Sua plataforma de estudos online</title>
				<link rel="shortcut icon" href="/images/favicon.png" type="image-png" />

				<link rel="stylesheet" href="/public/styles/main.css" />
				<link rel="stylesheet" href="/public/styles/partials/header.css" />
				<link rel="stylesheet" href="/public/styles/partials/forms.css" />
				{stylesheets.map((path) => (
					<link rel="stylesheet" href={path} />
				))}

				<link
					href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&amp;family=Poppins:wght@400;600&amp;display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Archivo&display=swap"
					rel="stylesheet"
				/>

				<script src="https://unpkg.com/htmx.org@1.9.10"></script>
			</head>
			{children}
		</html>
	);
}
