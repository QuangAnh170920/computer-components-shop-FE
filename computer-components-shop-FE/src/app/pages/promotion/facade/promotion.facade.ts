import { Injectable } from '@angular/core';
import { IPromotion, ISearch } from '../models/promotion.model';
import { PromotionService } from '../services/promotion.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NewPagingData, NewResponseData } from '../../../shared/models/paging.model';
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionFacade {
    private _id = new BehaviorSubject<any | null>(null);
  private _promotions = new BehaviorSubject<NewPagingData<IPromotion> | null>(null);
  private _promotion = new BehaviorSubject<NewResponseData<IPromotion> | null>(null);
  constructor(
    private promotionService: PromotionService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get promotionsPaging$(): Observable<NewPagingData<IPromotion> | null> {
    return this._promotions.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get promotionPaging$(): Observable<NewResponseData<IPromotion> | null> {
    return this._promotion.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.promotionService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._promotions.next(res.responseData);
      }
    });
  }

  create(payload: IPromotion) {
    return this.promotionService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._promotion.next(res.responseData);
        this.toastService.showSuccess('Thêm mới khuyến mãi thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  update(payload: IPromotion) {
    return this.promotionService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._promotion.next(res.responseData);
        this.toastService.showSuccess('Cập nhật khuyến mãi thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  approve(id: any, status: string) {
    return this.promotionService.approve(id, status).subscribe((res) => {
      if (res) {
        this._promotion.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái khuyến mãi thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.promotionService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._promotion.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái khuyến mãi thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  detail(id: any) {
    return this.promotionService.detail(id).subscribe((res: NewResponseData<IPromotion>) => {
      this._promotion.next(res);
    });
  }

  delete(id: any) {
    return this.promotionService.delete(id).subscribe((res) => {
      if (res) {
        this._promotion.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }
}
