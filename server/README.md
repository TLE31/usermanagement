## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`JWT_SECRET`

`SMTP_USER`

`SMTP_PASS`

## Installation Guide

### Server Side

```
npm i -g nodemon
```

```
cd server && nodemon
```

## API Reference

#### Sign In Users

```http
  POST /api/auth/signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Sign Up New Users

```http
  POST /api/auth/signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | **Required** |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |
| `gender`   | `string` | **Required** |
| `about`    | `string` | **Required** |

#### Generate OTP

```http
  POST /api/otp/generate
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `email`   | `string` | **Required** |

#### Verify OTP

```http
  POST /api/otp/verify
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `otp`     | `string` | **Required** |
| `email`   | `string` | **Required** |

#### Get uer account

```http
  GET /api/account
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

#### Update User Details

```http
  PUT /api/account/update
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |
| `name`    | `string` | **Required** |
| `email`   | `string` | **Required** |
| `gender`  | `string` | **Required** |
| `about`   | `string` | **Required** |

#### Delete User Account

```http
  POST /api/account/update
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

#### Get all Users

```http
  POST /api/account/all
```
