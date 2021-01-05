# Login

Used to collect a Token for a registered User.

**URL** : `/api/v1/users/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "email": "crhis35@gmail.com",
  "password": "admin1234"
}
```

## Success Response

**Code** : `201 OK`

**Content example**

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlNzY2M2VmLTllYjItNDI5NS1hMzZmLTFjNjg5NmYzMTZjZCIsImlhdCI6MTYwOTg1NDc3OSwiZXhwIjoxNjE3NzE3MTc5fQ.h6ByIT7uBbf_q7b_HlHUFEap8pJv_YN-fsWTJPSbkEU",
    "data": {
        "user": {
            "id": "1e7663ef-9eb2-4295-a36f-1c6896f316cd",
            "name": "Crhistian",
            "email": "crhis35@gmail.com",
            "role": "admin",
            "createdAt": "2021-01-05T02:49:18.508Z",
            "updatedAt": "2021-01-05T02:49:18.508Z"
        }
    }
}
```

> Passwor was exclude.

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": "fail",
    "message": "Incorrect email or password"
}
{
    "status": "fail",
    "message": "Please provide email and password"
}
```

* [Main](../README.md)