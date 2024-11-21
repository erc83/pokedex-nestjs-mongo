<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript proyect pokedex mongoDB.

# I.- Pasos para levantar proyecto localmente

#### 1. Project setup Localmente

```bash
$ yarn install
```

#### 2. Nest setup

```bash
npm i -g @nestjs/cl
```

#### 3. Docker setup Database
```
docker-compose up -d
```

#### 4. conect database mongo with mongDBb Compass

```
mongodb://localhost:27019/
```

#### 5. Clonar el archivo __.env.template__ y renombrar la copia a **.env**


#### 6. Llenar las variables de entorno definidas en **.env**

#### 7. Ejecutar la aplicación en dev:

```
yarn start:dev
```

## 8. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* nest js
* docker


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



# II.- Pasos para ejecutar la app en contenedores en develop

Nota: tener instalado docker desktop


#### 1. BUILD
```
docker-compose -f docker-compose.dev.yaml --env-file .env.dev up --build
```

#### 2. RUN

```
docker-compose -f docker-compose.dev.yaml --env-file .env.dev up -d 
```



# III.- Pasos para ejecutar la app en contenedores en production

#### 1. Clonar .env.example y renombrar por .env.prod

#### 2. Llenar las variable de entorno definidas en **.env.prod** con una URL mongodb Atlas valida

#### 3. BUILD
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

#### 2. RUN

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d 
```

```
docker ps
```

```
docker exec -it pokedexapp sh
```

```
ps aux
```


#### NOTA para prod: 

- si queremos utilizar el .env el comando docker-compose lo busca por defecto, no es necesario esta intruccion de buscar un archivo distinto --env-file .env.prod

### Example

1. build con archivo .env 

```
docker-compose -f docker-compose.prod.yaml  --build
```

2. run app con archivo .env
```
docker-compose -f docker-compose.prod.yaml up -d 
```
