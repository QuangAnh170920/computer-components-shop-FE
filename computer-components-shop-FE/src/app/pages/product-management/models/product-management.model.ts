export interface IPayload {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    discountAmount: number;
    discountPercentage: number;
    finalTotalPrice: number;
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

export interface IProduct {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    discountAmount: number;
    discountPercentage: number;
    finalTotalPrice: number;
    status: string;
}