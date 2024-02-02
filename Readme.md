# BINAR APP

This documentation provides an overview of the key functionalities and endpoints of the E-Commerce application API.

## Register

### Request

`POST /register/v1`

Body
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

Headers
    {
        Not Need
    }

### Response

