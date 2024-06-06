import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { IBrand, IPayload, ISearch } from '../models/brand-management.model';
import { API_ROUTER } from '../../../shared/constants/api.constant';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { PagingData } from '../../../shared/models/paging.model';

@Injectable({
  providedIn: 'root',
})
export class BrandManagementService {
  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.BRAND.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.BRAND.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.BRAND.UPDATE}`, payload);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.BRAND.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.BRAND.UPDATE_STATUS}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.BRAND.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.BRAND.DETAIL}${id}`);
  }
}
