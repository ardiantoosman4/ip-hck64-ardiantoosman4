[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/eVluYqZE)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12859639&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2 (TENFLIX)

&nbsp;

## 1. POST /add-user

Request:

- body:

```json
{ "email": "staff13@mail.com", "password": "12345" }
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "email": "staff13@mail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": string
}
```

&nbsp;

## 2. POST /login

- body:

```json
{ "email": "staff13@mail.com", "password": "12345" }
```

_Response (200 - OK)_

```json
{
  "access_token": "JWT TOKEN"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": string
}
```

&nbsp;

## 3. POST /googleLogin

- body:

```json
{
  "googleToken": "Google Token"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "JWT TOKEN"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": string
}
```

## 4. POST /midtrans/payment

- Description:
  To accept response from midtrans and give back 200

- Header:

```json
{
  "authentication": "Bearer <JWT TOKEN>"
}
```

- body:

```json
{
  "transaction_status":string,
  "fraud_status":string,
  "order_id":string
}
```

_Response (200 - OK)_

## 5. POST /midtrans/token

- Description:
  To get midtrans token and create new order

- Header:

```json
{
  "authentication": "Bearer <JWT TOKEN>"
}
```

- body:

```json
{
  "price": 1000,
  "title": string,
  "movie_id": 1,
  "imgUrl": string,
  "description": string,
  "duration": 0,
}
```

_Response (200 - OK)_

```json
{
  "response":{
    "token": string
  }
}
```

## 6. GET /my-profile

- Description:
  To get transaction done by user

- Header:

```json
{
  "authentication": "Bearer <JWT TOKEN>"
}
```

_Response (200 - OK)_

```json
[

  {
    "order_id": string,
    "UserId": integer,
    "orderTime": date,
    "price": number,
    "title": string,
    "movie_id": number,
    "imgUrl": string,
    "description": string,
    "duration": number,
    "trailerUrl": string,
    "paymentStatus": string
  }
  ...
]

```

&nbsp;

## 7. DELETE /my-profile/order/:OrderId

- Header:

```json
{
  "authorization": "Bearer <JWT TOKEN>"
}
```

- path parameter:

```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "order_id": string,
  "UserId": integer,
  "orderTime": date,
  "price": number,
  "title": string,
  "movie_id": number,
  "imgUrl": string,
  "description": string,
  "duration": number,
  "trailerUrl": string,
  "paymentStatus": string
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data with id <id> is not found"
}
```

&nbsp;

## 8. get /my-profile/order/:OrderId

- Header:

```json
{
  "authorization": "Bearer <JWT TOKEN>"
}
```

- path parameter:

```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
  "order_id": string,
  "UserId": integer,
  "orderTime": date,
  "price": number,
  "title": string,
  "movie_id": number,
  "imgUrl": string,
  "description": string,
  "duration": number,
  "trailerUrl": string,
  "paymentStatus": string
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data with id <id> is not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
