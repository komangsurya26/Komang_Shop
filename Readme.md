# BINAR APP

This documentation provides an overview of the key functionalities and endpoints of the E-Commerce application API.

## Register

### Request

`POST /register/v1`

Body
```
{
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "email": "string",
    "password": "string",
    "address": "string",
    "city": "string",
    "postal_code": "string",
    "country_code": "string"
}
```

Header
```
{
    Not Need
}
```

### Response (200 - OK)

```
{
    "success": true,
    "message": "Cek Your Email For Verify!!",
    "status_code": 200,
    "data": {
        "name": "karmini",
        "email": "karmininengah6@gmail.com"
    }
}
```

### Response (400 - BAD REQUEST)

```
{
    "success": false,
    "message": "Input Email & Password",
    "status_code": 400,
    "data": null
}
```

### Response (409 - CONFLICT)

```
{
    "success": false,
    "message": "Email Already Exist!",
    "status_code": 409,
    "data": null
}
```

### Response (400 - BAD REQUEST)

```
{
    "success": false,
    "message": "Input Email & Password",
    "status_code": 400,
    "data": null
}
```

## Login

### Request

`POST /login/v1`

Body
```
{
    "email": "string",
    "password": "string"
}
```

Header
```
{
    Not Need
}
```

***Response (200 - OK)***

```
{
    "success": true,
    "message": "Login Succcess! 👏",
    "status_code": 200,
    "data": {
        "token": "string"
    }
}
```
***Response (404 - NOT FOUND)***
Your Email Not Found At System

```
{
    "success": false,
    "message": "Email Not Found!",
    "status_code": 404,
    "data": null
}
```

***Response (400 - BAD REQUEST)***
You Must Verify Your Email And Login Again

```
{
    "success": false,
    "message": "Please Verify Your Email!",
    "status_code": 400,
    "data": null
}
```

***Response (401 - Unauthorized)***
Your Password Wrong

```
{
    "success": false,
    "message": "Incorrect Password! 👎",
    "status_code": 401,
    "data": null
}
```














