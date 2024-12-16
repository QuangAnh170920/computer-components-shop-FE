import { Injectable } from '@angular/core';
import { API_ROUTER } from '../../../shared/constants/api.constant';
import { ApiService } from '../../../shared/services/api.service';
import { IPayload, ISearch, IShippingInventory } from '../models/shipping-inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingInventoryService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.SHIPPING_INVENTORY.SEARCH}`, payload);
  }

  create(payload: IShippingInventory) {
    return this.apiService.post(`${API_ROUTER.SHIPPING_INVENTORY.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.SHIPPING_INVENTORY.UPDATE}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.SHIPPING_INVENTORY.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.SHIPPING_INVENTORY.DETAIL}${id}`);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.SHIPPING_INVENTORY.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.SHIPPING_INVENTORY.UPDATE_STATUS}`, payload);
  }
}
