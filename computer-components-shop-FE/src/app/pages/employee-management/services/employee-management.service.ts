import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { IPayload, ISearch } from '../models/employee-management.model';
import { API_ROUTER } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.EMPLOYEE_MANAGEMENT.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.EMPLOYEE_MANAGEMENT.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.EMPLOYEE_MANAGEMENT.UPDATE}`, payload);
  }

  approve(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.EMPLOYEE_MANAGEMENT.UPDATE_STATUS}`, payload);
  }

  unapprove(id: any, status: string) {
    const payload = {
      id,
      status
    }
    return this.apiService.put(`${API_ROUTER.EMPLOYEE_MANAGEMENT.UPDATE_STATUS}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.EMPLOYEE_MANAGEMENT.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.EMPLOYEE_MANAGEMENT.DETAIL}${id}`);
  }
}
