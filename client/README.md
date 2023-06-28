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

### `Rename a Group`
Edit a group by either clicking on the group name or clicking the **Rename** button, add change the name and/or hostname. The name or hostname must not clash with another group's name or hostname.

### `Delete a Group`
Delete a group by clicking the **Delete** button and confirming.

### `Create an Endpoint`
Click the group link to show the group's endpoints.
Create a new endpoint by clicking the **Create** button, and entering the endpoint details. The combination of path, HTTP method and request body must not clash with another endpoint.

### `Update an Endpoint`
Edit an endpoint by either clicking on the endpoint name or clicking the **Update** button, add change the endpoint details. The combination of path, HTTP method and request body must not clash with another endpoint.

### `Test an Endpoint`
For GET endpoints, click the endpoint link to show the endpoint response from the server's /static endpoint in the browser.
For other HTTP methods, clicking the endpoint link will display a curl command which can be saved to the clipboard. This command can be run in the terminal to display the response, since the browser does not support other HTTP methods.

### `Delete an Endpoint`
Delete an endpoint by clicking the **Delete** button and confirming.