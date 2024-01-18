# Order flow

## Description

This is a simple order flow application that uses NestJS, RabbitMQ, TypeORM, PostgreSQL and Docker.

## Installation

```bash
$ yarn install
```

## Running the database and rabbitmq with docker

```bash
$ docker-compose up -d
```

## Running the main app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the payment app

```bash
# development
$ yarn run start payment

# watch mode
$ yarn run start:dev payment

# production mode
$ yarn run start:prod payment
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
