import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import {
  IPayload,
  IReceivingInventory,
  ISearch,
} from '../models/receiving-inventory.model';
import {
  NewPagingData,
  NewResponseData,
} from '../../../shared/models/paging.model';
import { ReceivingInventoryService } from '../services/receiving-inventory.service';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ReceivingInventoryFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _ris = new BehaviorSubject<NewPagingData<IReceivingInventory> | null>(
    null
  );
  private _ri =
    new BehaviorSubject<NewResponseData<IReceivingInventory> | null>(null);
  constructor(
    private receivingInventoryService: ReceivingInventoryService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get receivingInventorysPaging$(): Observable<NewPagingData<IReceivingInventory> | null> {
    return this._ris.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get receivingInventoryPaging$(): Observable<NewResponseData<IReceivingInventory> | null> {
    return this._ri.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.receivingInventoryService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._ris.next(res.responseData);
      }
    });
  }

  create(payload: IReceivingInventory) {
    return this.receivingInventoryService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._ri.next(res.responseData);
        this.toastService.showSuccess('Thêm mới đơn nhập hàng thành công');
        this.search({type: '1', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  update(payload: IPayload) {
    return this.receivingInventoryService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._ri.next(res.responseData);
        this.toastService.showSuccess('Cập nhật đơn nhập hàng thành công');
        this.search({type: '1', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  detail(id: any) {
    return this.receivingInventoryService
      .detail(id)
      .subscribe((res: NewResponseData<IReceivingInventory>) => {
        this._ri.next(res);
      });
  }

  delete(id: any) {
    return this.receivingInventoryService.delete(id).subscribe((res) => {
      if (res) {
        this._ri.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({type: '1', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  approve(id: any, status: string) {
    return this.receivingInventoryService.approve(id, status).subscribe((res) => {
      if (res) {
        this._ri.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái thành công'
        );
        this.search({type: '1', pageNumber: 1, pageSize: 10 });
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.receivingInventoryService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._ri.next(res.responseData);
        this.toastService.showSuccess(
          'Cập nhật trạng thái thành công'
        );
        this.search({type: '1', pageNumber: 1, pageSize: 10 });
      }
    });
  }
}
