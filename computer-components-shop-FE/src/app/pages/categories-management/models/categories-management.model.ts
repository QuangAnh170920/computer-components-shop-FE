export interface IPayload {
    id: number;
    code: string;
    name: string;
    description: string;
    status: string;
}

export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;
}

export interface ISearch  {
    searchField?: string;
    status?: string;
}

export interface ICategories {
    id: number;
    code: string;
    name: string;
    description: string;
    status: string;
    parentId: number;
    children: [];
}