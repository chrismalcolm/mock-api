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


https://github.com/chrismalcolm/mock-api/assets/43220741/55b6ca0e-f3d1-4b7b-b4d1-e6bf9b2ae23e



    [Rename a Group](#rename-a-group)


https://github.com/chrismalcolm/mock-api/assets/43220741/14e37820-964d-4e49-abd9-6c28fa919ef8


    [Delete a Group](#delete-a-group)

* **Endpoints:**

    [Create an Endpoint](#create-an-endpoint)


https://github.com/chrismalcolm/mock-api/assets/43220741/2840a062-0355-4737-bc0d-2fa9e5da818f


    [Update an Endpoint](#update-an-endpoint)


Uploading Mock API Clip Update Endpoint.mov…


    [Test an Endpoint](#test-an-endpoint)


Uploading Mock API Clip Testing Endpoint.mov…


    [Delete an Endpoint](#delete-an-endpoint)


https://github.com/chrismalcolm/mock-api/assets/43220741/44901c9c-c497-4da1-b098-daf2983ec327


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
