import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import {
  NewPagingData,
  NewResponseData,
} from '../../../shared/models/paging.model';
import { ShippingInventoryService } from '../services/shipping-inventory.service';
import { IPayload, ISearch, IShippingInventory, IShippingInventoryUpdate } from '../models/shipping-inventory.model';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ShippingInventoryFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _sis = new BehaviorSubject<NewPagingData<IShippingInventory> | null>(
    null
  );
  private _si = new BehaviorSubject<NewResponseData<IShippingInventory> | null>(
    null
  );
  constructor(
    private shippingInventoryService: ShippingInventoryService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get shippingInventorysPaging$(): Observable<NewPagingData<IShippingInventory> | null> {
    return this._sis.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get shippingInventoryPaging$(): Observable<NewResponseData<IShippingInventory> | null> {
    return this._si.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.shippingInventoryService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._sis.next(res.responseData);
      }
    });
  }

  create(payload: IShippingInventory) {
    return this.shippingInventoryService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._si.next(res.responseData);
        this.toastService.showSuccess('Thêm mới đơn xuất hàng thành công');
        this.search({type: '2', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  update(payload: IPayload) {
    return this.shippingInventoryService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._si.next(res.responseData);
        this.toastService.showSuccess('Cập nhật đơn xuất hàng thành công');
        this.search({type: '2', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  detail(id: any) {
    return this.shippingInventoryService
      .detail(id)
      .subscribe((res: NewResponseData<IShippingInventory>) => {
        this._si.next(res);
      });
  }

  delete(id: any) {
    return this.shippingInventoryService.delete(id).subscribe((res) => {
      if (res) {
        this._si.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({type: '2', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  approve(id: any, status: string) {
    return this.shippingInventoryService.approve(id, status).subscribe((res) => {
      if (res) {
        this._si.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái thành công'
        );
        this.search({type: '2', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.shippingInventoryService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._si.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái thành công'
        );
        this.search({type: '2', pageNumber: 1, pageSize: 10 });
      }
    });
  }
}
