import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { API_ROUTER } from '../../../shared/constants/api.constant';
import { IPayload, ISearch } from '../models/categories-management.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.CATEGORIES.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.CATEGORIES.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.CATEGORIES.UPDATE}`, payload);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.CATEGORIES.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.CATEGORIES.UPDATE_STATUS}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.CATEGORIES.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.CATEGORIES.DETAIL}${id}`);
  }
}
