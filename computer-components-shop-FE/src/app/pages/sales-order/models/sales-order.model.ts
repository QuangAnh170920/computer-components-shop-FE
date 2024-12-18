export interface IPayload {
    id?: number;
    code?: string;
    name?: string;
    shippingAddress?: string;
    paymentMethod?: string;
    totalQuantity?: number;
    totalPrice?: number;
    status?: string;
    userId?: number;
    createdAt?: Date;
    orderDetail?: IOrderDetailDTO[];
    description?: string;
  }
  
  export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;
  }
  
  export interface ISearch {
    pageNumber?: number;
    pageSize?: number;
    searchField?: string;
    productId?: number;
    type?: string;
  }
  
  export interface IOrders {
    code: string;
    name: string;
    shippingAddress: string;
    paymentMethod: string;
    totalQuantity: number;
    totalPrice: number;
    status: string;
    userId: number;
    createdAt: Date;
    orderDetail: IOrderDetailDTO[];
    description: string;
  }
  
  export interface IOrdersUpdate {
    id: number;
    code: string;
    name: string;
    shippingAddress: string;
    paymentMethod: string;
    totalQuantity: number;
    totalPrice: number;
    status: string;
    userId: number;
    createdAt: Date;
    orderDetail: IOrderDetailDTO[];
    description: string;
  }
  
  export interface IOrderDetailDTO{
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
  }
  
  export enum PaymentMethod {
    CASH = 1,
    BANK_TRANSFER = 2,
    MOBILE_PAYMENT = 3,
  }
  