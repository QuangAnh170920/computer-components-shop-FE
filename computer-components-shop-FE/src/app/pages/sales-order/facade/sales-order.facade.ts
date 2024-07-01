import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";
import { ISaleOrder, ISearch } from "../models/sales-order.model";
import { NewPagingData, NewResponseData } from "../../../shared/models/paging.model";
import { SalesOrderService } from "../services/sales-order.service";
import { ToastService } from "../../../shared/services/toast.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class SaleOrderFacade {
    private _id = new BehaviorSubject<any | null>(null);
    private _saleOrders = new BehaviorSubject<NewPagingData<ISaleOrder> | null>(
      null
    );
    private _saleOrder = new BehaviorSubject<NewResponseData<ISaleOrder> | null>(
      null
    );
    constructor(
      private saleOrderService: SalesOrderService,
      private toastService: ToastService
    ) {}
  
    get id$(): Observable<any> {
      return this._id.asObservable().pipe(
        filter((res: any) => res),
        distinctUntilChanged()
      );
    }
  
    get saleOrdersPaging$(): Observable<NewPagingData<ISaleOrder> | null> {
      return this._saleOrders.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    get saleOrderPaging$(): Observable<NewResponseData<ISaleOrder> | null> {
      return this._saleOrder.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    search(payload: ISearch) {
      this.saleOrderService.search(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._saleOrders.next(res.responseData);
        }
      });
    }
  
    create(payload: ISaleOrder) {
      return this.saleOrderService.create(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._saleOrder.next(res.responseData);
          this.toastService.showSuccess('Thêm mới đơn hàng thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    update(payload: ISaleOrder) {
      return this.saleOrderService.update(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._saleOrder.next(res.responseData);
          this.toastService.showSuccess('Cập nhật đơn hàng thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    approve(id: any, status: string) {
      return this.saleOrderService.approve(id, status).subscribe((res) => {
        if (res) {
          this._saleOrder.next(res.responseData);
          this.toastService.showSuccess(
            'Cập nhật trạng thái đơn hàng thành công'
          );
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    unapprove(id: any, status: string) {
      return this.saleOrderService.unapprove(id, status).subscribe((res) => {
        if (res) {
          this._saleOrder.next(res.responseData);
          this.toastService.showSuccess(
            'Cập nhật trạng thái đơn hàng thành công'
          );
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    detail(id: any) {
      return this.saleOrderService
        .detail(id)
        .subscribe((res: NewResponseData<ISaleOrder>) => {
          this._saleOrder.next(res);
        });
    }
  
    delete(id: any) {
      return this.saleOrderService.delete(id).subscribe((res) => {
        if (res) {
          this._saleOrder.next(res);
          this.toastService.showSuccess('Xóa thông tin thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  }