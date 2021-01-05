# SignUp

Used to collect a Token for a registered User.

**URL** : `/api/v1/users/signup`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "[Name]",
    "email": "[Valid Email]",
    "password": "[Password with at leats 8 characters]",
    "role": "[Role is admin if is empty by default is user]"
}
```

**Data example**

```json
{
    "name": "Crhistian",
    "email": "cristian35@gmail.com",
    "password": "admin1234",
    "role": "admin"
}
```

## Success Response

**Code** : `201 OK`

**Content example**

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjNWJkMGU5LTliMGYtNGI3Mi05ZDQzLWIwYjc3N2ZjN2M5OSIsImlhdCI6MTYwOTg2Mzg0OSwiZXhwIjoxNjE3NzI2MjQ5fQ.3hYoZn4dpf79i9EHyEuT1Ab5ZAIJt9VUBhgHBDkDCXA",
    "data": {
        "user": {
            "id": "dc5bd0e9-9b0f-4b72-9d43-b0b777fc7c99",
            "name": "Crhistian",
            "email": "cristian35@gmail.com",
            "role": "admin",
            "updatedAt": "2021-01-05T16:24:04.850Z",
            "createdAt": "2021-01-05T16:24:04.850Z"
        }
    }
}
```

> Password was exclude.

## Error Response

**Condition** : If 'email' and exists.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": "fail",
    "message": "Email Already exist"
}
{
    "status": "error",
    "message": "Something went very wrong!"
}
```