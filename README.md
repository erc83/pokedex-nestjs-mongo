<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript proyect pokedex mongoDB.

## 1. Project setup

```bash
$ yarn install
```

## 2. Nest setup

```bash
npm i -g @nestjs/cl
```

## 3. Docker setup Database
```
docker-compose up -d
```

## 4. conect database mongo with mongDBb Compass

```
mongodb://localhost:27019/
```

## 5. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* nest js



## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
