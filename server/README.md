# Server
Back-end application. Used to manage hostname, endpoint and static JSON resourses stored in MongoDB.

## Requirements
yarn, docker, docker-compose

## Usage
To setup MongoDB.
```
docker-compose up -d
```

To run the client locally on port 4000.
```
yarn start
````

To close and cleanup MongoDB.
```
docker-compose down -v
```

## Routes

* **Group Routes:**

    [GET /groups](#get-groups)

    [POST /groups](#post-groups)

    [PUT /groups/:id](#put-groupsid)

    [DELETE /groups/:id](#delete-groupsid)

* **Endpoint Routes:**

    [GET /endpoints](#get-endpoints)

    [GET /groups/:groupid/endpoints](#get-groupsgroupidendpoints)

    [POST /groups/:groupid/endpoints](#post-groupsgroupidendpoints)

    [PUT /groups/:groupid/endpoints/:id](#put-groupsgroupidendpointsid)

    [DELETE /groups/:groupid/endpoints/:id](#delete-groupsgroupidendpointsid)

* **Static Routes:**

    [GET /static/:hostname/:path](#get-statichostnamepath)

    [POST /static/:hostname/:path](#post-statichostnamepath)

    [PUT /static/:hostname/:path](#put-statichostnamepath)

    [DELETE /static/:hostname/:path](#delete-statichostnamepath)

### `GET /groups`

Returns the groups.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/groups"
```

```json
{
  "groups": [
    {
      "_id": "649d65dbd4b8906c04df749f",
      "name": "Data Store",
      "hostname": "data-store",
      "createdAt": "2023-06-29T11:07:07.247Z",
      "updatedAt": "2023-06-29T12:00:32.803Z",
      "__v": 0
    }
  ]
}
```

### `POST /groups`

Create a group.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/groups" -d '{"name": "New Name", "hostname": "new-hostname"}'
```

```json
{
  "message": "Group 'New Name' created",
  "group": {
    "name": "New Name",
    "hostname": "new-hostname",
    "_id": "649d7d5357a82584e6323b04",
    "createdAt": "2023-06-29T12:47:15.423Z",
    "updatedAt": "2023-06-29T12:47:15.423Z",
    "__v": 0
  },
  "groups": [
    {
      "_id": "649d65dbd4b8906c04df749f",
      "name": "Data Store",
      "hostname": "data-store",
      "createdAt": "2023-06-29T11:07:07.247Z",
      "updatedAt": "2023-06-29T12:00:32.803Z",
      "__v": 0
    },
    {
      "_id": "649d7d5357a82584e6323b04",
      "name": "New Name",
      "hostname": "new-hostname",
      "createdAt": "2023-06-29T12:47:15.423Z",
      "updatedAt": "2023-06-29T12:47:15.423Z",
      "__v": 0
    }
  ]
}
```

### `PUT /groups/:id`

Update a group.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/groups/649d7d5357a82584e6323b04" -d '{"name": "Old Name", "hostname": "old-hostname"}'
```

```json
{
  "message": "Group 'Old Name' updated",
  "group": {
    "_id": "649d7d5357a82584e6323b04",
    "name": "New Name",
    "hostname": "new-hostname",
    "createdAt": "2023-06-29T12:47:15.423Z",
    "updatedAt": "2023-06-29T12:47:15.423Z",
    "__v": 0
  },
  "groups": [
    {
      "_id": "649d65dbd4b8906c04df749f",
      "name": "Data Store",
      "hostname": "data-store",
      "createdAt": "2023-06-29T11:07:07.247Z",
      "updatedAt": "2023-06-29T12:00:32.803Z",
      "__v": 0
    },
    {
      "_id": "649d7d5357a82584e6323b04",
      "name": "Old Name",
      "hostname": "old-hostname",
      "createdAt": "2023-06-29T12:47:15.423Z",
      "updatedAt": "2023-06-29T12:49:27.683Z",
      "__v": 0
    }
  ]
}
```

### `DELETE /groups/:id`

Delete a group.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/groups/649d7d5357a82584e6323b04"
```

```json
{
  "message": "Group 'Old Name' deleted",
  "group": {
    "_id": "649d7d5357a82584e6323b04",
    "name": "Old Name",
    "hostname": "old-hostname",
    "createdAt": "2023-06-29T12:47:15.423Z",
    "updatedAt": "2023-06-29T12:49:27.683Z",
    "__v": 0
  },
  "groups": [
    {
      "_id": "649d65dbd4b8906c04df749f",
      "name": "Data Store",
      "hostname": "data-store",
      "createdAt": "2023-06-29T11:07:07.247Z",
      "updatedAt": "2023-06-29T12:00:32.803Z",
      "__v": 0
    }
  ]
}
```

### `GET /endpoints`

Returns all the endpoints.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/endpoints"
```

```json
{
  "endpoints": [
    {
      "_id": "649abe6929d06b0c9bbb0d51",
      "path": "/metrics",
      "httpMethod": "GET",
      "responseCode": "200",
      "requestBody": "",
      "responseBody": "[1,2,3,4]",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:48:09.247Z",
      "updatedAt": "2023-06-27T10:48:09.247Z",
      "__v": 0
    },
    {
      "_id": "649abeb529d06b0c9bbb0d5f",
      "path": "/events",
      "httpMethod": "POST",
      "responseCode": "200",
      "requestBody": "[1,2,3]",
      "responseBody": "[4,5,6]",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:49:25.222Z",
      "updatedAt": "2023-06-27T10:49:25.222Z",
      "__v": 0
    },
    {
      "_id": "649d7069d4b8906c04df74d2",
      "path": "/other-data",
      "httpMethod": "PUT",
      "responseCode": "400",
      "requestBody": "{\"user\":\"admin\"}",
      "responseBody": "{\"metadata\":{\"tags\":[\"colours\",\"sizes\",\"retailer\"]},\"quantities\":[10,4,45,15,30,26,7]}",
      "groupID": "649d65dbd4b8906c04df749f",
      "createdAt": "2023-06-29T11:52:09.111Z",
      "updatedAt": "2023-06-29T12:01:15.791Z",
      "__v": 0
    }
  ]
}
```

### `GET /groups/:groupid/endpoints`

Returns the endpoints for the given group.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/groups/649abe5629d06b0c9bbb0d49/endpoints"
```

```json
{
  "endpoints": [
    {
      "_id": "649abeb529d06b0c9bbb0d5f",
      "path": "/events",
      "httpMethod": "POST",
      "responseCode": "200",
      "requestBody": "[1,2,3]",
      "responseBody": "[4,5,6]",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:49:25.222Z",
      "updatedAt": "2023-06-27T10:49:25.222Z",
      "__v": 0
    }
  ]
}
```

### `POST /groups/:groupid/endpoints`

Create an endpoint for the given group.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/groups/649abe5629d06b0c9bbb0d49/endpoints" -d '{"path":"/event","httpMethod":"GET","responseCode":"200","requestBody":"","responseBody":[1,2,3]}'
```

```json
{
  "message": "Endpoint '/event [GET] 200' created",
  "endpoint": {
    "path": "/event",
    "httpMethod": "GET",
    "responseCode": "200",
    "requestBody": "",
    "groupID": "649abe5629d06b0c9bbb0d49",
    "_id": "649d81df57a82584e6323b1b",
    "responseBody": "undefined",
    "createdAt": "2023-06-29T13:06:39.429Z",
    "updatedAt": "2023-06-29T13:06:39.429Z",
    "__v": 0
  },
  "endpoints": [
    {
      "_id": "649abeb529d06b0c9bbb0d5f",
      "path": "/more-events",
      "httpMethod": "DELETE",
      "responseCode": "500",
      "requestBody": "",
      "responseBody": "error",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:49:25.222Z",
      "updatedAt": "2023-06-29T13:04:16.494Z",
      "__v": 0
    },
    {
      "_id": "649d81df57a82584e6323b1b",
      "path": "/event",
      "httpMethod": "GET",
      "responseCode": "200",
      "requestBody": "",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "responseBody": "undefined",
      "createdAt": "2023-06-29T13:06:39.429Z",
      "updatedAt": "2023-06-29T13:06:39.429Z",
      "__v": 0
    }
  ]
}
```

### `PUT /groups/:groupid/endpoints/:id`

Update an endpoint for the given group.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/groups/649abe5629d06b0c9bbb0d49/endpoints/649abeb529d06b0c9bbb0d5f" -d '{"path":"/more-events","httpMethod":"DELETE","responseCode":"500","requestBody":"","responseBody":"error"}'
```

```json
{
  "message": "Endpoint '/more-events [DELETE] 500' updated",
  "endpoint": {
    "_id": "649abeb529d06b0c9bbb0d5f",
    "path": "/events",
    "httpMethod": "POST",
    "responseCode": "404",
    "requestBody": "",
    "responseBody": "error",
    "groupID": "649abe5629d06b0c9bbb0d49",
    "createdAt": "2023-06-27T10:49:25.222Z",
    "updatedAt": "2023-06-29T13:01:37.850Z",
    "__v": 0
  },
  "endpoints": [
    {
      "_id": "649abeb529d06b0c9bbb0d5f",
      "path": "/more-events",
      "httpMethod": "DELETE",
      "responseCode": "500",
      "requestBody": "",
      "responseBody": "error",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:49:25.222Z",
      "updatedAt": "2023-06-29T13:04:16.494Z",
      "__v": 0
    }
  ]
}
```

### `DELETE /groups/:groupid/endpoints/:id`

Delete an endpoint for the given group.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/groups/649abe5629d06b0c9bbb0d49/endpoints/649abe6929d06b0c9bbb0d51"
```

```json
{
  "message": "Endpoint '/metrics [GET] 200' deleted",
  "endpoint": {
    "_id": "649abe6929d06b0c9bbb0d51",
    "path": "/metrics",
    "httpMethod": "GET",
    "responseCode": "200",
    "requestBody": "",
    "responseBody": "[1,2,3,4]",
    "groupID": "649abe5629d06b0c9bbb0d49",
    "createdAt": "2023-06-27T10:48:09.247Z",
    "updatedAt": "2023-06-27T10:48:09.247Z",
    "__v": 0
  },
  "endpoints": [
    {
      "_id": "649abeb529d06b0c9bbb0d5f",
      "path": "/events",
      "httpMethod": "POST",
      "responseCode": "200",
      "requestBody": "[1,2,3]",
      "responseBody": "[4,5,6]",
      "groupID": "649abe5629d06b0c9bbb0d49",
      "createdAt": "2023-06-27T10:49:25.222Z",
      "updatedAt": "2023-06-27T10:49:25.222Z",
      "__v": 0
    }
  ]
}
```

### `GET /static/:hostname/:path`

Returns the static JSON for a configured GET endpoint.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/static/data-store/metrics"
```

```json
{
  "metadata": {
    "tags": [
      "colours",
      "sizes",
      "retailer"
    ]
  },
  "quantities": [
    10,
    30,
    7
  ]
}
```

### `POST /static/:hostname/:path`

Returns the static JSON for a configured POST endpoint.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/static/data-store/metrics?a=1&b=2" -d '{"c":4}'
```

```json
{
    "message": "new metric created"
}
```

### `PUT /static/:hostname/:path`

Returns the static JSON for a configured PUT endpoint.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/static/data-store/items" -d '{"item":"hat}'
```

```json
{
    "message": "item updated"
}
```

### `DELETE /static/:hostname/:path`

Returns the static JSON for a configured DELETE endpoint.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/static/data-store/items/shoe"
```

```json
{
    "message": "shoe deleted"
}
```