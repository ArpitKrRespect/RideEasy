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

### POST `/user/login` Endpoint

#### Description
This endpoint is used to log in an existing user.

### HTTP METHOD 
`POST`

#### Request Body
The request body must be a JSON object containing the following fields:
- `email`: A string representing a valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  - **Description**: User logged in successfully.
  - **Body**: A JSON object containing the user details and an authentication token.
  - **Example**:
    ```json
    {
      "message": "Log in Successful",
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

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Invalid Email or Password"
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

### GET `/user/profile` Endpoint

#### Description
This endpoint is used to get the profile of the authenticated user.

### HTTP METHOD 
`GET`

#### Headers
- `Authorization`: A string containing the Bearer token.

#### Responses

- **200 OK**
  - **Description**: User profile retrieved successfully.
  - **Body**: A JSON object containing the user details.
  - **Example**:
    ```json
    {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **401 Unauthorized**
  - **Description**: Authentication token is missing or invalid.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Authentication required"
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

### GET `/user/logout` Endpoint

#### Description
This endpoint is used to log out the authenticated user.

### HTTP METHOD 
`GET`

#### Headers
- `Authorization`: A string containing the Bearer token.

#### Responses

- **200 OK**
  - **Description**: User logged out successfully.
  - **Body**: A JSON object containing a success message.
  - **Example**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - **Description**: Authentication token is missing or invalid.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Authentication required"
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

### POST `/captain/register` Endpoint

#### Description
This endpoint is used to register a new captain.

### HTTP METHOD 
`POST`

#### Request Body
The request body must be a JSON object containing the following fields:
- `fullName`: An object containing `firstName` and `lastName`.
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 3 characters.
- `email`: A string representing a valid email address.
- `password`: A string with a minimum length of 6 characters.
- `vehicle`: An object containing `color`, `plate`, `type`, and `capacity`.
  - `color`: A string representing the vehicle color.
  - `plate`: A string representing the vehicle plate.
  - `type`: A string representing the vehicle type (e.g., car, bike, auto).
  - `capacity`: A number representing the vehicle capacity (minimum 1).
- `location`: An object containing `latitude` and `longitude`.
  - `latitude`: A number representing the latitude.
  - `longitude`: A number representing the longitude.

Example:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "type": "car",
    "capacity": 4
  },
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

#### Responses

- **201 Created**
  - **Description**: Captain created successfully.
  - **Body**: A JSON object containing the captain details and an authentication token.
  - **Example**:
    ```json
    {
      "message": "Captain registered successfully",
      "captain": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "type": "car",
          "capacity": 4
        },
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194
        }
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
