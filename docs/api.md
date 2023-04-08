# API

## Routes

### GET `/api/v1/user`

Returns information about the user.

#### Response

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
  "latency": 123.45
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
    "latency": 123.45
  },
  {
    "id": 2,
    "lat": 59.345,
    "lon": 18.123,
    "speed": 123.45,
    "latency": 123.45
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
  "latency": 123.45
}
```
