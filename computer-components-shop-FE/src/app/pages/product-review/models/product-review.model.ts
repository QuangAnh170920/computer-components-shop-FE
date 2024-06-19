export interface IPayload {
    id: number;
    productId: number;
    userId: number;
    comment: string;
    rate: number;
}

export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;
}

export interface ISearch  {
    pageNumber?: number;
    pageSize?: number;
    productId?: number;
    userId?: number;
}

export interface IProductReview {
    id: number;
    productId: number;
    userId: number;
    comment: string;
    rate: number;
}