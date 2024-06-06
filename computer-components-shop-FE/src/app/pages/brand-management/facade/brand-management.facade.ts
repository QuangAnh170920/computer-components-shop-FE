import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { NewPagingData, PagingData } from '../../../shared/models/paging.model';
import { ToastService } from '../../../shared/services/toast.service';
import { IBrand, IResponse, ISearch } from '../models/brand-management.model';
import { BrandManagementService } from '../services/brand-management.service';

@Injectable({
  providedIn: 'root',
})
export class BrandManagementFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _brands = new BehaviorSubject<NewPagingData<IBrand> | null>(null);
  private _brand = new BehaviorSubject<IBrand | null>(null);
  constructor(
    private brandService: BrandManagementService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get brandPaging$(): Observable<NewPagingData<IBrand> | null> {
    return this._brands.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.brandService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._brands.next(res.responseData);
      }
    });
  }

  create(payload: IBrand) {
    return this.brandService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._brand.next(res.responseData);
        this.toastService.showSuccess('Thêm mới thương hiệu thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  update(payload: IBrand) {
    return this.brandService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._brand.next(res.responseData);
        this.toastService.showSuccess('Cập nhật thương hiệu thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  approve(id: any, status: string) {
    return this.brandService.approve(id, status).subscribe((res) => {
      if (res) {
        this._brand.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái thương hiệu thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.brandService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._brand.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái thương hiệu thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  detail(id: any) {
    return this.brandService.detail(id).subscribe((res: any) => {
      this._brand.next(res.responseData);
    });
  }

  delete(id: any) {
    return this.brandService.delete(id).subscribe((res) => {
      if (res) {
        this._brand.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }
}
