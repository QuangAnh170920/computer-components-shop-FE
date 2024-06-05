export interface IPayload {
    id: number;
    code: string;
    name: string;
    description: string;
    status: number;
}

export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;
}

export interface ISearch  {
    pageNumber?: number;
    pageSize?: number;
    searchField?: string;
    status?: number;
}

export interface IBrand {
    id: number;
    code: string;
    name: string;
    description: string;
    status: number;
}