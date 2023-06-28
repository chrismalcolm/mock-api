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

}
```

### `POST /groups`

Create a group.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/groups" -d ''
```

```json
{

}
```

### `PUT /groups/:id`

Update a group.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>" -d ''
```

```json
{

}
```

### `DELETE /groups/:id`

Delete a group.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>"
```

```json
{

}
```

### `GET /endpoints`

Returns all the endpoints.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/endpoints"
```

```json
{

}
```

### `GET /groups/:groupid/endpoints`

Returns the endpoints for the given group.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>/endpoints/<endpointid>"
```

```json
{

}
```

### `POST /groups/:groupid/endpoints`

Create an endpoint for the given group.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>/endpoints/<endpointid>" -d ''
```

```json
{

}
```

### `PUT /groups/:groupid/endpoints/:id`

Update an endpoint for the given group.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>/endpoints/<endpointid>" -d ''
```

```json
{

}
```

### `DELETE /groups/:groupid/endpoints/:id`

Delete an endpoint for the given group.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/groups/<groupid>/endpoints/<endpointid>"
```

```json
{

}
```

### `GET /static/:hostname/:path`

Returns the static JSON for a configured GET endpoint.
```bash
curl -X GET -H "Content-Type:application/json" "http://localhost:4000/static/<hostname>/<path>"
```

```json
{

}
```

### `POST /static/:hostname/:path`

Returns the static JSON for a configured POST endpoint.
```bash
curl -X POST -H "Content-Type:application/json" "http://localhost:4000/static/<hostname>/<path>" -d ''
```

```json
{

}
```

### `PUT /static/:hostname/:path`

Returns the static JSON for a configured PUT endpoint.
```bash
curl -X PUT -H "Content-Type:application/json" "http://localhost:4000/static/<hostname>/<path>" -d ''
```

```json
{

}
```

### `DELETE /static/:hostname/:path`

Returns the static JSON for a configured DELETE endpoint.
```bash
curl -X DELETE -H "Content-Type:application/json" "http://localhost:4000/static/<hostname>/<path>"
```

```json
{

}
```