export interface IPayload {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    finalTotalPrice: number;
    power: string;
    imageUrl: string;
    categoryId: number;
    promotionId: number;
    status: string;
    productFeatures: IProductFeatures[];
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
    code: string;
    name: string;
    description: string;
    price: number;
    finalTotalPrice: number;
    power: string;
    imageUrl: string;
    categoryId: number;
    promotionId: number;
    productFeatures: IProductFeatures[];
}

export interface IProductUpdate {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    finalTotalPrice: number;
    power: string;
    imageUrl: string;
    categoryId: number;
    promotionId: number;
    productFeatures: IProductFeatures[];
}

export interface IProductFeatures {
    name: string;
    priority: number;
}