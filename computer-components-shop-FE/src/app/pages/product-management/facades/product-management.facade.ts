import { Injectable } from '@angular/core';
import { IPayload, IProduct, ISearch } from '../models/product-management.model';
import { ProductManagementService } from '../services/product-management.service';
import { BehaviorSubject, Observable, filter, distinctUntilChanged } from 'rxjs';
import { NewPagingData, NewResponseData } from '../../../shared/models/paging.model';
import { ToastService } from '../../../shared/services/toast.service';
import { IBrand } from '../../brand-management/models/brand-management.model';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _products = new BehaviorSubject<NewPagingData<IProduct> | null>(null);
  private _product = new BehaviorSubject<NewResponseData<IProduct> | null>(null);
  constructor(
    private productService: ProductManagementService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get productsPaging$(): Observable<NewPagingData<IProduct> | null> {
    return this._products.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get productPaging$(): Observable<NewResponseData<IProduct> | null> {
    return this._product.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.productService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._products.next(res.responseData);
      }
    });
  }

  create(payload: IProduct) {
    return this.productService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._product.next(res.responseData);
        this.toastService.showSuccess('Thêm mới sản phẩm thành công');
        this.search({});
      }
    });
  }

  update(payload: IPayload) {
    return this.productService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._product.next(res.responseData);
        this.toastService.showSuccess('Cập nhật sản phẩm thành công');
        this.search({});
      }
    });
  }

  approve(id: any, status: string) {
    return this.productService.approve(id, status).subscribe((res) => {
      if (res) {
        this._product.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái sản phẩm thành công'
        );
        this.search({});
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.productService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._product.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái sản phẩm thành công'
        );
        this.search({});
      }
    });
  }

  detail(id: any) {
    return this.productService
      .detail(id)
      .subscribe((res: NewResponseData<IProduct>) => {
        this._product.next(res);
      });
  }

  delete(id: any) {
    return this.productService.delete(id).subscribe((res) => {
      if (res) {
        this._product.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({});
      }
    });
  }
}
