import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { IPayload, IReceivingInventory, ISearch } from '../models/receiving-inventory.model';
import { API_ROUTER } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ReceivingInventoryService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.RECEIVING_INVENTORY.SEARCH}`, payload);
  }

  create(payload: IReceivingInventory) {
    return this.apiService.post(`${API_ROUTER.RECEIVING_INVENTORY.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.RECEIVING_INVENTORY.UPDATE}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.RECEIVING_INVENTORY.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.RECEIVING_INVENTORY.DETAIL}${id}`);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.RECEIVING_INVENTORY.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.RECEIVING_INVENTORY.UPDATE_STATUS}`, payload);
  }
}
