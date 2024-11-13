import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { API_ROUTER } from '../../../shared/constants/api.constant';
import { IPayload, IProduct, ISearch } from '../models/product-management.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.PRODUCT.SEARCH}`, payload);
  }

  create(payload: IProduct) {
    return this.apiService.post(`${API_ROUTER.PRODUCT.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.PRODUCT.UPDATE}`, payload);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.PRODUCT.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.PRODUCT.UPDATE_STATUS}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.PRODUCT.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.PRODUCT.DETAIL}${id}`);
  }
}
