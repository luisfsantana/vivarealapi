# Spotippos REST API

Partial code implementation for [Viva Real back-end challenge](https://github.com/VivaReal/code-challenge/blob/master/backend.md).


## Requirements

* [Git](https://git-scm.com/)

## Stack

* [Node.JS](https://nodejs.org/en/)
* [Lambda functions](https://aws.amazon.com/lambda/?nc1=h_ls)
* [Swagger 2.0](http://swagger.io/)
* [Serveless 1.0](https://serverless.com/)


## Importing provinces/properties data

```sh
$ curl -H "Content-Type: application/json" -X POST -d @./data/provinces.json http://localhost:8080/loadProvinces
$ curl -H "Content-Type: application/json" -X POST -d @./data/properties.json http://localhost:8080/loadProperties
```

## REST API

### 1. Create properties
Request:
```
POST /properties
```

Body:
```json
{
  "x": 222,
  "y": 444,
  "title": "Imóvel código 1, com 5 quartos e 4 banheiros",
  "price": 1250000,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "beds": 4,
  "baths": 3,
  "squareMeters": 210
}
```
Response:
```json
{
  "id": 665,
  "title": "Imóvel código 1, com 5 quartos e 4 banheiros",
  "price": 1250000,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "x": 222,
  "y": 444,
  "beds": 4,
  "baths": 3,
  "provinces" : ["Ruja"],
  "squareMeters": 210
}
```

Response Code | Description
------------|---------
201 | Created
400 | Invalid Parameters
500 | Internal Server Error

Example:
```sh
$ curl -H "Content-Type: application/json" -X POST -d '{"x":222,"y":444,"title": "Title","price":1250000,"description":"Description","beds":4,"baths":3,"squareMeters":210}' http://localhost:8080/properties
```

### 2. Get properties

Request:
```
GET /properties/{id}
```

Response:
```json
{
  "id": 665,
  "title": "Imóvel código 665, com 1 quarto e 1 banheiro",
  "price": 540000,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "x": 667,
  "y": 556,
  "beds": 1,
  "baths": 1,
  "provinces" : ["Ruja"],
  "squareMeters": 42
}
```
Response Code | Description
------------|---------
200 | OK
404 | Entity Not Found
400 | Invalid Parameters
500 | Internal Server Error

Example:
```sh
$ curl -H "Accept: application/json" http://localhost:8080/properties/665
```

### 3. Find properties

Request:
```
GET /properties?ax={integer}&ay={integer}&bx={integer}&by={integer}
```

Response:
```json
{
  "foundProperties": 60,
  "properties": [
    {
      "id": 34,
      "title": "Imóvel código 34, com 4 quartos e 3 banheiros",
      "price": 1250000,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "x": 999,
      "y": 333,
      "beds": 4,
      "baths": 3,
      "squareMeters": 237,
      "provinces" : ["Scavy", "Gode"]
    },
    {"..."},
    {"..."}
  ]
}
```

Response Code | Description
------------|---------
200 | OK
400 | Invalid Parameters
500 | Internal Server Error

Example:
```sh
$ curl -H "Accept: application/json" http://localhost:8080/properties/?ax=0&ay=100&bx=100&by=0
```

## Model

The application has three main classes:

* Property: a single property with its attributes and coordinate
* Province: represents a single province with its coordinate
* Maps: Maap with all Position, each Position contains a list of property ids and province names

These 3 entities are using RDS (MySQL) database. 

The Lambda functions allows: no servers to manage, continuous scaling, subsecond metering. 


