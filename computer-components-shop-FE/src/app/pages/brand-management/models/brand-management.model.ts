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
    pageNumber?: number;
    pageSize?: number;
    searchField?: string;
    status?: string;
}

export interface IBrand {
    id: number;
    code: string;
    name: string;
    description: string;
    status: string;
}