# GraphQL-Application

## Descrição do Projeto

A aplicação consiste em é um servidor backend desenvolvido utilizando GraphQL e TypeORM em Node.js com TypeScript. O principal objetivo é criar operações CRUD (Create, Read, Update, Delete) para a tabela de usuários em um banco de dados PostgreSQL. A aplicação é voltada para fornecer uma API simples e eficiente para gerenciar usuários, utilizando as melhores práticas de desenvolvimento com as tecnologias mencionadas.

## Ambiente e ferramentas.

- Node.js
- TypeScript
- PostgreSQL
- GraphQL
- TypeORM

## Etapas para executar e depurar.

### Pré-requisitos

- Node.js instalado
- Banco de dados PostgreSQL configurado e acessível
- Gerenciador de pacotes npm

### Instalação

1. Clone o repositório do projeto.
2. Navegue até o diretório do projeto no terminal.
3. Execute o comando `npm install` para instalar as dependências.

### Execução

1. Certifique-se de que o banco de dados PostgreSQL está em execução e acessível.
2. Suba o container docker com o comando `docker-compose up -d` para iniciar o banco.
3. Execute o comando `npm run start` para iniciar aplicação.
4. O servidor estará acessível na porta especificada.

### Depuração

1. Utilize ferramentas de desenvolvimento, como o depurador do VSCode, configurado para TypeScript.
2. execute o comando `npm run test` visualizar os testes da aplicação.
3. Use logs e ferramentas de monitoramento para rastrear e resolver problemas durante o desenvolvimento e teste.
