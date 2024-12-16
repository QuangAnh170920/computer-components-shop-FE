export interface IPayload {
  id?: number;
  code?: string;
  name?: string;
  supplier?: string;
  type?: string;
  totalQuantity?: number;
  totalPrice?: number;
  employeeId?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  warehouseProductDTOS?: IWarehouseProductDTOS[];
  description?: string;
  transactionDate?: Date;
  status?: string;
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

export interface IReceivingInventory {
  code: string;
  name: string;
  supplier: string;
  type: string;
  totalQuantity: number;
  totalPrice: number;
  employeeId: number;
  paymentMethod: string;
  paymentStatus: string;
  warehouseProductDTOS: IWarehouseProductDTOS[];
  description: string;
  transactionDate: Date;
}

export interface IReceivingInventoryUpdate {
  id: number;
  code: string;
  name: string;
  supplier: string;
  type: string;
  totalQuantity: number;
  totalPrice: number;
  employeeId: number;
  paymentMethod: string;
  paymentStatus: string;
  warehouseProductDTOS: IWarehouseProductDTOS[];
  description: string;
  transactionDate: Date;
}

export interface IWarehouseProductDTOS {
  warehouseId: number;
  productId: number;
  quantity: number;
  price: number;
}

export enum PaymentMethod {
  CASH = 1,
  BANK_TRANSFER = 2,
  MOBILE_PAYMENT = 3,
}
