export interface IPayload {
  id?: number;
  code?: string;
  name?: string;
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

export interface IShippingInventory {
  code: string;
  name: string;
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

export interface IShippingInventoryUpdate {
  id?: number;
  code: string;
  name: string;
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
