import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ROUTER } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class DropListService {

  constructor(private apiService: ApiService) {}

  getProductList() {
    return this.apiService.get(`${API_ROUTER.DROP_LIST.PRODUCT_LIST}`);
  }

  getCategoriesList() {
    return this.apiService.get(`${API_ROUTER.DROP_LIST.CATEGORIES_LIST}`);
  }

  getBrandList() {
    return this.apiService.get(`${API_ROUTER.DROP_LIST.BRAND_LIST}`);
  }
}
