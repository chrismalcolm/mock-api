# Client
Front-end application. Used to configure the mock API hostnames, endpoints and static JSON files.

## Requirements
yarn

## Usage
To run the client locally on port 3000.
```
yarn start
````

## Guide

* **Groups:**

    [Create a Group](#create-a-group)

    [Rename a Group](#rename-a-group)

    [Delete a Group](#delete-a-group)

* **Endpoints:**

    [Create an Endpoint](#create-an-endpoint)

    [Update an Endpoint](#update-an-endpoint)

    [Test an Endpoint](#test-an-endpoint)

    [Delete an Endpoint](#delete-an-endpoint)


### `Create a Group`
Create a new group by clicking the **Create** button, and entering a name and hostname. The name or hostname must not clash with another group's name or hostname.

https://github.com/chrismalcolm/mock-api/assets/43220741/55b6ca0e-f3d1-4b7b-b4d1-e6bf9b2ae23e

### `Rename a Group`
Edit a group by either clicking on the group name or clicking the **Rename** button, add change the name and/or hostname. The name or hostname must not clash with another group's name or hostname.

https://github.com/chrismalcolm/mock-api/assets/43220741/14e37820-964d-4e49-abd9-6c28fa919ef8

### `Delete a Group`
Delete a group by clicking the **Delete** button and confirming.

https://github.com/chrismalcolm/mock-api/assets/43220741/9200b22c-225a-4c56-a1e6-9287b2eff9ab

### `Create an Endpoint`
Click the group link to show the group's endpoints.
Create a new endpoint by clicking the **Create** button, and entering the endpoint details. The combination of path, HTTP method and request body must not clash with another endpoint.

https://github.com/chrismalcolm/mock-api/assets/43220741/2840a062-0355-4737-bc0d-2fa9e5da818f

### `Update an Endpoint`
Edit an endpoint by either clicking on the endpoint name or clicking the **Update** button, add change the endpoint details. The combination of path, HTTP method and request body must not clash with another endpoint.

https://github.com/chrismalcolm/mock-api/assets/43220741/591f59f8-5897-40ef-91ec-ed4e62943bac

### `Test an Endpoint`
For GET endpoints, click the endpoint link to show the endpoint response from the server's /static endpoint in the browser.
For other HTTP methods, clicking the endpoint link will display a curl command which can be saved to the clipboard. This command can be run in the terminal to display the response, since the browser does not support other HTTP methods.

https://github.com/chrismalcolm/mock-api/assets/43220741/317f7ba9-c40b-4bb8-ac90-8c361aa76b15

### `Delete an Endpoint`
Delete an endpoint by clicking the **Delete** button and confirming.

https://github.com/chrismalcolm/mock-api/assets/43220741/44901c9c-c497-4da1-b098-daf2983ec327
