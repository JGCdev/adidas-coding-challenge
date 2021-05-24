# Adidas NodeJS Coding Challenge
## Microservices API arquitecture

API designed to scale horizontally, built with NodeJS, Express, MongoDB and Docker 


## Services
- Subscriptions API private service
- Mockup Email private service
- Public API to route and apply security layer
- MongoDB accesible only from private subscriptions service
- Swagger-UI only on development build


## Requirements
Node.js v12.18.0+

Docker

Docker-compose


## Build and Run services
Development:

```
docker-compose -f docker-compose-dev.yml up --build
```

Production:

```
docker-compose up --build
```


## Run tests
Make sure containers are already up and built on development mode

Test subscriptions service
```
docker-compose run subscriptions npm run test
```

Test email service
```
docker-compose run email npm run test
```

## API Docs
Available on development build
```
http://localhost:8081/
```


## Tech
| Framework | Description | Docs |
| ------ | ------ | ------ |
| express | Lightweight framework with HTTP server, error handling and routing  | [**Readme**](https://github.com/expressjs/express/blob/4.17.1/Readme.md) |
| mocka | Testing framework to combine with chai | [**Readme**](https://github.com/mochajs/mocha/blob/v8.4.0/README.md) |

| Library | Description | Docs |
| ------ | ------ | ------ |
| mongoose | ORM to structure data between NodeJS and MongoDB | [**Readme**](https://github.com/Automattic/mongoose/blob/5.12.10/README.md) |
| axios | Communication between services trhough HTTP, promise based | [**Readme**](https://github.com/axios/axios/blob/v0.21.1/README.md)|
| express-rate-limit | Used to manage consumption API rate limits | [**Readme**](https://github.com/nfriedly/express-rate-limit/blob/v5.2.6/README.md) |
| helmet | Some basic configurations por HTTP header | [**Readme**](https://github.com/helmetjs/helmet/blob/v4.6.0/README.md) |
| chai | Assertion library for NodeJS, testing purposes | [**Readme**](https://github.com/chaijs/chai/blob/v4.3.4/README.md) |
| chai-http | Http integration for chai libray | [**Readme**](https://github.com/chaijs/chai-http/blob/4.3.0/README.md) |


## CI/CD Proposal
Attached sketch in Jenkinsfile 


## Things to improve
- Apply cors policy to public API
- Add https to public API
- Implement some queue system like RabbitMQ or Apache Kafka
- Build with single dockerfile at root level to favor CI/CD pipeline

## License

[MIT license](LICENSE)



