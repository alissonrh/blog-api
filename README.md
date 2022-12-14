
<h1 align="center">Projeto Blog-API</h1>

## Descrição

O Blog-API é uma **API REST** conectada a um bando de dados para a produção de conteúdo para um blog. A aplicação foi desenvolvida em `Node.js`, usando o pacote `sequelize` para fazer o `CRUD` (criação, leitura, atualização e exclusão) de posts nos diferentes endpoints que a API apresenta. Para fazer um **post(POST)**, **editar(PUT)**, **deletar(DELETE)**, ou **acessar(GET)** é necessário usuário e login, portanto foi trabalhado a relação entre `user` e `post`. Foi necessário a utilização de categorias para os posts, trabalhando, assim, a relação de `posts` / `categories`.

## Tecnologias e Ferramentas

Este projeto foi desenvolvido em ambiente isolado de desenvolvimento `Docker` em `Node.js`. Os endpoits para as requisições HTTP que permitem o CRUD desta API foram estruturados com o framework  `Express.js`. A comunicação com o banco de dados foi otimizada usando a técnica **ORM (Object-Relational Mapping ou, em português, mapeamento objeto-relacional)**! O ORM provê uma maneira de alterar e interagir com um banco de dados por meio de código `JavaScript`. A partir dele, é possível criar e alterar tabelas, realizar consultas, inserir e extrair dados do banco, tudo isso apenas escrevendo código JavaScript. A biblioteca utilizada para trabalhar com ORM foi o `Sequelize` compatível com diversos bancos de dados. Neste projeto foi utilizado o `MySQL`. Para autenticação de algumas rotas e endpoints foi utilizado o padão `JWT` (JSON Web Token).


## Instalando e executando o aplicativo

```
 git clone git@github.com:alissonrh/blog-api.git
 cd blog-api
 npm install
```

### - Executando com Docker
```
cd blog-api
docker-compose up -d
docker exec -it blog_api bash
npm install
npm run debug
```

