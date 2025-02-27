# Plataforma de Artigos - Warlocks Tecnologia

Este repositório contém a implementação da plataforma de artigos desenvolvida para o desafio técnico da Warlocks Tecnologia. A solução é composta por um backend desenvolvido com NestJS e um frontend utilizando Next.js.

## Tecnologias Utilizadas

### Backend:

- **NestJS**: Framework Node.js para desenvolvimento modular.
- **Prisma ORM**: Gerenciamento do banco de dados com suporte a PostgreSQL e MongoDB.
- **JWT**: Autenticação segura.
- **Helmet**: Proteção contra vulnerabilidades.
- **Throttler (NestJS)**: Limita requisições para evitar ataques de força bruta.
- **Swagger**: Documentação da API.

### Frontend:

- **Next.js**: Framework React para renderização eficiente.
- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono e cache.
- **React-Intl**: Internacionalização da aplicação.
- **Context API**: Gerenciamento de autenticação.

## Estrutura do Repositório

```
/
├── backend/  # Código do backend (NestJS)
├── frontend/ # Código do frontend (Next.js)
├── README.md # Documentação do projeto
```

## Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Configurar o Backend

```bash
cd backend
cp .env.example .env # Configurar variáveis de ambiente
npm install
npm run start:dev
```

O backend rodará por padrão na porta `3333`.

### 3. Configurar o Frontend

```bash
cd ../frontend
cp .env.example .env # Configurar variáveis de ambiente
npm install
npm run dev
```

O frontend estará acessível em `http://localhost:3000`.

## Documentação da API

A documentação da API pode ser acessada via Swagger em:

```
http://localhost:3333/api
```

## Testes Automatizados

Tanto no backend quanto no frontend, foram implementados testes utilizando Jest e React Testing Library. Para executá-los:

```bash
# No backend
cd backend
npm run test

# No frontend
cd ../frontend
npm run test
```

## Infraestrutura

- **Banco de Dados**: Mongo DB
- **ORM**: Prisma
- **Deploy**: Docker.
