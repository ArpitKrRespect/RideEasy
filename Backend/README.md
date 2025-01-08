# Backend API Documentation

## Endpoints

### POST `/user/register` Endpoint

#### Description
This endpoint is used to register a new user.

### HTTP METHOD 
`POST`


#### Request Body
The request body must be a JSON object containing the following fields:
- `fullname`: An object containing `firstname` and `lastname`.
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A string representing a valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **201 Created**
  - **Description**: User created successfully.
  - **Body**: A JSON object containing the user details and an authentication token.
  - **Example**:
    ```json
    {
      "message": "User created successfully",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email address",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "An unexpected error occurred"
    }
    ```
