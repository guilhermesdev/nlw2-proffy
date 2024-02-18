<p align="center">
	<img alt="Proffy" src=".github/logo.svg" width="160px">
</p>

# ![Proffy](.github/cover.png)

## O que é Proffy?

Proffy é uma plataforma que busca conectar alunos e educadores independentes de maneira simples e direta.

## Tecnologias utilizadas

- [Bun](https://bun.sh/) 
- [Elysia](https://elysiajs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Drizzle](https://orm.drizzle.team/)

## Executando o projeto

Clone o projeto e acesse sua respectiva pasta.

```sh
git clone https://github.com/guilhermesdev/proffy.git
cd proffy
```

Instale as dependências do projeto

```sh
bun install
```

Copie o conteúdo do arquivo `.env.example` para o arquivo `.env`

```sh
cp .env.example .env
```

E então execute o seguinte comando para iniciar o banco de dados e rodar a aplicação em modo de desenvolvimento:

```sh
bun run db:migrate && bun run dev
```