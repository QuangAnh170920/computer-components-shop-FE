export interface IPayload {
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
    productId?: number;
}

export interface IWareHouse {
    id?: number;
    code?: string;
    name?: string;
    quantityAvailable?: number;
}