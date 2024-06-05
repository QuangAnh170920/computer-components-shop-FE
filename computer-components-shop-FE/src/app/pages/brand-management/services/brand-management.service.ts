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
  private _id = new BehaviorSubject<any | null>(null);
  private _brands = new BehaviorSubject<PagingData<IBrand> | null>(null);
  private _brand = new BehaviorSubject<PagingData<IBrand> | null>(null);
  constructor(private apiService: ApiService) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get brandPaging$(): Observable<IBrand> {
    return this._brand.asObservable().pipe(
        filter((res: any) => res),
        distinctUntilChanged()
    );
}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.BRAND.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.BRAND.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.BRAND.UPDATE}`, payload);
  }

  delete(id: any) {
    return this.apiService.delete(`${API_ROUTER.BRAND.DELETE}${id}`);
  }

  detail(id: any) {
    return this.detailBrand(id).subscribe((res: any) => {
      this._brand.next(res);
    });
  }

  detailBrand(id: any) {
    return this.apiService.post(`${API_ROUTER.BRAND.DETAIL}${id}`);
  }
}
