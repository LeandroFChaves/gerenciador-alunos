# Gerenciador de Alunos

Projeto desenvolvido com o objetivo de estudar algumas tecnologias (principalmente NodeJS) e para ajudar um amigo em gerenciar seus alunos em sua academia e/ou escola.


## Tecnologias

As tecnologias e linguagens utilizadas foram:

+ FrontEnd
    + [Angular 12](https://angular.io)
    + [Angular Material 12](https://material.angular.io)

+ BackEnd
    + [NestJS 8](https://nestjs.com)

+ Banco de Dados
    + [PostgreSQL](https://www.postgresql.org)

+ Infra
    + Toda a infra do sistema está dockerizada (https://www.docker.com)


### Features
#### Negócio
- Cadastro de pessoas (aluno);
- Cadastro de produtos;
- Registro de venda dos produtos;

#### Técnico
- Autenticação JWT;
- Utilização do [TypeORM](https://typeorm.io) para a parte de gerenciamento do banco de dados;
- Todo o projeto dockerizado e com docker compose para subir o mesmo;


## Como rodar
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e testes.

Consulte Implantação para saber como implantar o projeto.

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install) - Versão 1.29.x ou superior;
- [Node.js](https://nodejs.org/en/) - Versão 14.x.x ou superior;
- [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli) - Versão 12.2.x ou superior;

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Rodando o Banco de Dados

```bash
# Clone este repositório
git clone https://github.com/LeandroFChaves/gerenciador-alunos.git

# Acesse a pasta do projeto no terminal/cmd
cd gerenciador-alunos

# Vá para a pasta docker/postgresql
cd docker/postgresql

# Execute o comando
docker-compose up

# Acesse o adminer. Adminer é uma ferramenta de gerenciamento de banco de dados baseada em PHP, gratuito e de código aberto
http://localhost:8080

# Dados para acessar o banco
Sistema: PostgreSQL
Servidor: postgresql
Usuário: admin
Senha: admin
Banco de Dados: gerenciador-alunos
```

Existe um volume criado externalizado o postgresql/data.

### Rodando o BackEnd

```bash
# Clone este repositório
git clone https://github.com/LeandroFChaves/gerenciador-alunos.git

# Acesse a pasta do projeto no terminal/cmd
cd gerenciador-alunos

# Vá para a pasta da api
cd gerenciador-alunos-api

# Instale as dependências
npm install

# Execute a aplicação em modo de desenvolvimento
npm run start:dev

# A api inciará na porta 3000
http://localhost:3000
```

### Rodando o FrontEnd

```bash
# Clone este repositório
git clone https://github.com/LeandroFChaves/gerenciador-alunos.git

# Acesse a pasta do projeto no terminal/cmd
cd gerenciador-alunos

# Vá para a pasta da ui (user interface)
cd gerenciador-alunos-ui

# Instale as dependências
npm install

# Execute a aplicação em modo de desenvolvimento
ng serve

# O servidor inciará na porta 4200
http://localhost:4200

# Dados para acesso
Usuário: user1@user.com
Senha: 123456
```

## Implantação

Para subir todo o projeto em um ambiente de produção pode-se utilizar o docker juntamente com o docker compose. Para isso basta seguir os passos abaixo:

```bash
# Clone este repositório
git clone https://github.com/LeandroFChaves/gerenciador-alunos.git

# Acesse a pasta do projeto no terminal/cmd
cd gerenciador-alunos

# Vá para a pasta docker/aplicacao
cd docker/aplicacao

# Execute o comando abaixo para executar em modo detached (background)
docker-compose up --build -d
ou
docker-compose up --build

# O sistema inciará na porta 4200
http://localhost:4200

# Dados para acesso
Usuário: user1@user.com
Senha: 123456
```

Para parar/interromper a execução do sistema execute o comando:
```ssh
docker-compose down --volumes
```

Para visualizar todos os containers em execução execute o comando:
```ssh
docker container ls
```

Existe um volume criado externalizando o postgresql/data para um pasta database/data que ficará localizada dentro da pasta **docker/aplicacao**.

## Links

Abaixo segue alguns links de tutorias e referências que foram utilizadas durante o desenvolvimento desse projeto.

- NestJS - https://medium.com/@iago.maiasilva/construindo-uma-api-com-nestjs-postgresql-e-docker-parte-1-criando-nosso-primeiro-endpoint-248d4b8ecc9c

- Angular 12 + Angular Material (Material Design)
https://youtube.com/playlist?list=PLGxZ4Rq3BOBpwaVgAPxTxhdX_TfSVlTcY

- Menu (sidebar e toolbar)
https://zoaibkhan.com/blog/create-a-responsive-sidebar-menu-with-angular-material/

- Autenticação
https://www.youtube.com/watch?v=k1O3z7Gqvfc
https://www.youtube.com/watch?v=SinonmkxRSI
https://www.youtube.com/watch?v=6vu5SkEMG-w 1:22

## Comandos Úteis
##### Build de um Dockerfile
docker build --no-cache -t gerenciador-alunos-api .
docker build --no-cache -t gerenciador-alunos-ui .

##### Subindo os containers com docker compose
docker-compose up --build
docker-compose up --build -d

##### Parando os containers com docker compose
docker-compose down --volumes

##### Acessando um container
```ssh
docker exec -it ID_CONTAINER /bin/sh
```