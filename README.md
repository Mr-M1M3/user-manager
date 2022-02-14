
# User Manager

A simple server to manage your users.




## Installation

1) Clone this repository in your machine

```bash
  git clone https://github.com/mr-m1m3/user-manager.git
  cd user-manager
```
2) Change configurations on `config/config.js`. You should replace whatever the value is predefined.

```javascript
CONFIG.PORT = PORT // PORT Number in which server should listen. Default is 8080. If you prefer, you set `PORT` by defining env variable named `PORT`.
CONFIG.DATABASE_STRING = 'URL_OF_YOUR_DATABASE' // Syntax: 'URL OF YOUR DATABASE` + '/THE NAME OF THE DATABASE IN WHICH YOU WANT TO SAVE DATA'. If not specified, an error will be thrown. If you don't specify collection, server will create a collection by default.
CONFIG.EMAIL_VALIDATOR_REGEXP = RegExp_To_Validate_Email // It's not recommended to change it, still you can change the RegExp to use whn validating Email
CONFIG.PASSWORD_VALIDATOR_REGEXP = RegExp_To_Validate_Password // same as EMAIL_VALIDATOR_REGEXP, except that it is used to validate password
CONFIG.NAME_VALIDATOR_REGEXP = RegExp_To_Validate_Name // Useful to validate names
CONFIG.PASSWORD_SALT = Password_Salt // A password salt is something, that will add before and after the password. If not specified, '_' will  be used. please be noted that, changing salt will prevent users from logging in.
CONFIG.SESSION_MAX_AGE = Session_Expire_Time_In_MS // Defines after what milliseconds, a session should expire. After logging in from a new device, server will send session id as cookies. As long as the cookie is valid, the user from that device won't need password to authenticate. Default is 7 days in milliseconds
```
3) Run the server

```bash
yarn start // or `npm run start` if you're using npm.
```

## API Reference

#### Create user

```http
  POST /user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User's Name |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

Creates an user on the `users` collection of your database. If any of the parameters are invalid, server will respond with a status of 400.
If user with same email exists, on the server responds 401.

#### Authenticate

```http
  POST /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user trying to login |
| `password`      | `string` | **Required**. Password of the user trying to login |

Authenticates the user. Server will send session ID as cookie. Session id will be stored in `tokens` collection.
As long as the session ID is valid, user will need no credentials to login with the same account. If email or password or both of them are wrong, responds 401.

#### Update

```http
  PUT /user/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `current_email`      | `string` | **Required**. Current email of the user |
| `current_password`      | `string` | **Required**. Current password of the user |
| `new_name`      | `string` | **Optional**. New Name of the user|
| `new_email`      | `string` | **Optional**. New email of the user|
| `new_password`      | `string` | **Optional**. New password of the user|

Updates user info. Every data is validated. Server responds relevant status based on validation.

#### Delete

```http
  DELETE /user/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user |
| `password`      | `string` | **Required**. Password of the user|

Deletes an user. Responds 401 if credentials are wrong.

## This server doesn't support `Forgot Password` feature. But, Author is working to add this feature.


## Authors

- [@Abir Sheikh](https://www.github.com/mr-m1m3)

