import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { IPayload, ISearch } from '../models/product-review.model';
import { API_ROUTER } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(private apiService: ApiService) {}

  search(payload: ISearch) {
    return this.apiService.post(`${API_ROUTER.PRODUCT_REVIEW.SEARCH}`, payload);
  }

  create(payload: IPayload) {
    return this.apiService.post(`${API_ROUTER.PRODUCT_REVIEW.CREATE}`, payload);
  }

  update(payload: IPayload) {
    return this.apiService.put(`${API_ROUTER.PRODUCT_REVIEW.UPDATE}`, payload);
  }

  delete(id: any) {
    return this.apiService.post(`${API_ROUTER.PRODUCT_REVIEW.DELETE}${id}`);
  }

  detail(id: any) {
    return this.apiService.post(`${API_ROUTER.PRODUCT_REVIEW.DETAIL}${id}`);
  }
}
