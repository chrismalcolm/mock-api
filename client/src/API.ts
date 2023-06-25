import axios, { AxiosResponse } from "axios"
import { serverHostname } from "./constants" 

axios.defaults.validateStatus = function () {
    return true;
};

export const getGroups = async (): Promise<AxiosResponse<ApiDataTypeGroup>> => {
    try {
        const groups: AxiosResponse<ApiDataTypeGroup> = await axios.get(
            serverHostname + "/groups"
        );
        return groups;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const addGroup = async (formData: IGroup): Promise<AxiosResponse<ApiDataTypeGroup>> => {
    try {
        const group: Omit<IGroup, "_id"> = {
            name: formData.name || "",
            hostname: formData.hostname || "",
        };
        const saveGroup: AxiosResponse<ApiDataTypeGroup> = await axios.post(
            serverHostname + "/groups",
            group
        );
        return saveGroup;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const updateGroup = async (formData: IGroup): Promise<AxiosResponse<ApiDataTypeGroup>> => {
    try {
        const groupUpdate: Pick<IGroup, "name" | "hostname"> = {
            name: formData.name,
            hostname: formData.hostname,
        };
        const updatedGroup: AxiosResponse<ApiDataTypeGroup> = await axios.put(
            `${serverHostname}/groups/${formData._id}`,
            groupUpdate
        );
        return updatedGroup;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const deleteGroup = async (_id: string): Promise<AxiosResponse<ApiDataTypeGroup>> => {
    try {
        const deletedGroup: AxiosResponse<ApiDataTypeGroup> = await axios.delete(
            `${serverHostname}/groups/${_id}`
        );
        return deletedGroup;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const getEndpoints = async (groupID: string): Promise<AxiosResponse<ApiDataTypeEndpoint>> => {
    try {
        const endpoints: AxiosResponse<ApiDataTypeEndpoint> = await axios.get(
            serverHostname + `/groups/${groupID}/endpoints`
        );
        return endpoints;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const getAllEndpoints = async (): Promise<AxiosResponse<ApiDataTypeEndpoint>> => {
    try {
        const endpoints: AxiosResponse<ApiDataTypeEndpoint> = await axios.get(
            serverHostname + `/endpoints`
        );
        return endpoints;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const addEndpoint = async (groupID: string, formData: IEndpoint): Promise<AxiosResponse<ApiDataTypeEndpoint>> => {
    try {
        const endpoint: Omit<IEndpoint, "_id"> = {
            path: formData.path || "",
            httpMethod: formData.httpMethod || "GET",
            responseCode: formData.responseCode || "200",
            requestBody: formData.requestBody || "",
            responseBody: formData.responseBody || "",
            groupID: groupID,
        };
        const saveEndpoint: AxiosResponse<ApiDataTypeEndpoint> = await axios.post(
            serverHostname + `/groups/${groupID}/endpoints`,
            endpoint
        );
        return saveEndpoint;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const updateEndpoint = async (groupID: string, formData: IEndpoint): Promise<AxiosResponse<ApiDataTypeEndpoint>> => {
    try {
        const endpointUpdate: Pick<IEndpoint, "path" | "httpMethod" | "responseCode" | "requestBody" | "responseBody" > = {
            path: formData.path,
            httpMethod: formData.httpMethod || "GET",
            responseCode: formData.responseCode || "200",
            requestBody: formData.requestBody,
            responseBody: formData.responseBody,
        };
        const updatedEndpoint: AxiosResponse<ApiDataTypeEndpoint> = await axios.put(
            `${serverHostname}/groups/${groupID}/endpoints/${formData._id}`,
            endpointUpdate
        );
        return updatedEndpoint;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const deleteEndpoint = async (groupID: string, _id: string): Promise<AxiosResponse<ApiDataTypeEndpoint>> => {
    try {
        const deletedEndpoint: AxiosResponse<ApiDataTypeEndpoint> = await axios.delete(
            `${serverHostname}/groups/${groupID}/endpoints/${_id}`
        );
        return deletedEndpoint;
    } catch (error) {
        console.log(error);
        throw error;
    };
};