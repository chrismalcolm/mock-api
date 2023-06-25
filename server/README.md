# Server
Back-end application. Used to manage hostname, endpoint and static JSON resourses stored in MongoDB.

## Requirements
`yarn`, `docker`, `docker-compose`

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