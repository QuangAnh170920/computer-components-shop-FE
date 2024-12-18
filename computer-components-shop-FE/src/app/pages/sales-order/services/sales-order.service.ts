import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { IPayload, ISearch } from '../models/sales-order.model';
import { API_ROUTER } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.SALE_ORDER.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.SALE_ORDER.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.SALE_ORDER.UPDATE}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.SALE_ORDER.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.SALE_ORDER.DETAIL}${id}`);
  }
}
