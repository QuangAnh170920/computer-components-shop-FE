import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";
import { NewPagingData, NewResponseData } from "../../../shared/models/paging.model";
import { ISearch, IWareHouse } from "../models/warehouse.model";
import { WarehouseService } from "../services/warehouse.service";
import { Injectable } from "@angular/core";
import { ToastService } from "../../../shared/services/toast.service";

@Injectable({
    providedIn: 'root',
  })
  export class WareHouseFacade {
    private _id = new BehaviorSubject<any | null>(null);
    private _whs = new BehaviorSubject<NewPagingData<IWareHouse> | null>(
      null
    );
    private _wh =
      new BehaviorSubject<NewResponseData<IWareHouse> | null>(null);
    constructor(
      private wareHouseService: WarehouseService,
      private toastService: ToastService
    ) {}
  
    get id$(): Observable<any> {
      return this._id.asObservable().pipe(
        filter((res: any) => res),
        distinctUntilChanged()
      );
    }
  
    get reviewsPaging$(): Observable<NewPagingData<IWareHouse> | null> {
      return this._whs.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    get reviewPaging$(): Observable<NewResponseData<IWareHouse> | null> {
      return this._wh.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    search(payload: ISearch) {
      this.wareHouseService.search(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._whs.next(res.responseData);
        }
      });
    }
  
    create(payload: IWareHouse) {
      return this.wareHouseService.create(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._wh.next(res.responseData);
          this.toastService.showSuccess('Thêm mới đánh giá thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    update(payload: IWareHouse) {
      return this.wareHouseService.update(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._wh.next(res.responseData);
          this.toastService.showSuccess('Cập nhật đánh giá thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    detail(id: any) {
      return this.wareHouseService
        .detail(id)
        .subscribe((res: NewResponseData<IWareHouse>) => {
          this._wh.next(res);
        });
    }
  
    delete(id: any) {
      return this.wareHouseService.delete(id).subscribe((res) => {
        if (res) {
          this._wh.next(res);
          this.toastService.showSuccess('Xóa thông tin thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  }