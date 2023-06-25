export const serverHostname: string = `${process.env.REACT_APP_SERVER_HOSTNAME}`;
export const serverHostnameStatic: string = `${process.env.REACT_APP_SERVER_HOSTNAME}/static/`;

export const HTTPMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
];

export const ResponseCodes = [
    "200 OK",
    "201 Created",
    "204 No Content",
    "400 Bad Request",
    "401 Unauthorized",
    "403 Forbidden",
    "404 Not Found",
    "422 Unprocessable Entity",
    "500 Internal Server Error",
];