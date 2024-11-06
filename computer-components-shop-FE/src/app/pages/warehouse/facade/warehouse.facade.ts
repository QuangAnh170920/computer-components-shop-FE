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
  
    get wareHousesPaging$(): Observable<NewPagingData<IWareHouse> | null> {
      return this._whs.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    get wareHousePaging$(): Observable<NewResponseData<IWareHouse> | null> {
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
  }