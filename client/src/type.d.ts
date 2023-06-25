interface IGroup {
    _id: string
    name: string
    hostname: string
    createdAt?: string
    updatedAt?: string
}

interface GroupProps {
    group: IGroup
}

interface IEndpoint {
    _id: string
    groupID: string
    path: string
    httpMethod: string
    responseCode: string
    requestBody: string
    responseBody: string
    createdAt?: string
    updatedAt?: string
}

interface EndpointProps {
    endpoint: IEndpoint
}

type ApiDataTypeGroup = {
    message: string
    status: string
    groups: IGroup[]
    group?: IGroup
    errorMessage?: string
}

type ApiDataTypeEndpoint = {
    message: string
    status: string
    endpoints: IEndpoint[]
    endpoint?: IEndpoint
    errorMessage?: string
}