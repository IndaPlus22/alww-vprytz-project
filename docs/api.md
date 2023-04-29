# API

## Routes

### GET `/api/v1/auth`

Returns sign-in url that user may be redirected to for authentication.

#### Response

```json
{
  "url": "https://example.com/auth"
}
```

### GET `/api/v1/auth/callback`

Callback route for authentication.

Required query parameters:

- `code` - OAuth2 code

Returns information about current user, if authentication was successful. Otherwise, returns an error.

#### Response

```json
{
  "id": 1,
  "name": "Jaap Haartsen",
  "email": "jaap.haartsen@example.com",
  "created_at": "2023-01-01T13:37:00.000Z",
  "updated_at": "2023-02-01T04:20:00.000Z"
}
```

If authentication was not successful, the response will be:

```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

### GET `/api/v1/user`

Returns information about the user.

#### Response

```json
{
  "id": 1,
  "name": "Jaap Haartsen",
  "email": "jaap.haartsen@example.com",
  "created_at": "2023-01-01T13:37:00.000Z",
  "updated_at": "2023-02-01T04:20:00.000Z"
}
```

### POST `/api/v1/measurements`

Creates a new measurement.

#### Request

```json
{
  "lat": 59.345,
  "lon": 18.123,
  "speed": 123.45,
  "latency": 123.45
}
```

#### Response

```json
{
  "id": 1,
  "lat": 59.345,
  "lon": 18.123,
  "speed": 123.45,
  "latency": 123.45,
  "created_at": "2023-01-01T13:37:00.000Z",
  "updated_at": "2023-02-01T04:20:00.000Z"
}
```

### GET `/api/v1/measurements`

Returns all measurements.

#### Response

```json
[
  {
    "id": 1,
    "lat": 59.345,
    "lon": 18.123,
    "speed": 123.45,
    "latency": 123.45,
    "user_id": 1,
    "created_at": "2023-01-01T13:37:00.000Z",
    "updated_at": "2023-02-01T04:20:00.000Z"
  },
  {
    "id": 2,
    "lat": 59.345,
    "lon": 18.123,
    "speed": 123.45,
    "latency": 123.45,
    "user_id": 1,
    "created_at": "2023-01-01T13:37:00.000Z",
    "updated_at": "2023-02-01T04:20:00.000Z"
  }
]
```

### GET `/api/v1/measurements/:id`

Returns a specific measurement.

#### Response

```json
{
  "id": 1,
  "lat": 59.345,
  "lon": 18.123,
  "speed": 123.45,
  "latency": 123.45,
  "user_id": 1,
  "created_at": "2023-01-01T13:37:00.000Z",
  "updated_at": "2023-02-01T04:20:00.000Z"
}
```