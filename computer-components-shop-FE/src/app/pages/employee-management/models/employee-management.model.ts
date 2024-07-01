export interface IPayload {
    id: number;
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

export interface IEmployee {
    id: number;
    status: string;
}