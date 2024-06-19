import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from 'rxjs';
import { NewPagingData, NewResponseData } from '../../../shared/models/paging.model';
import { IProductReview, ISearch } from '../models/product-review.model';
import { ProductReviewService } from '../services/product-review.service';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _reviews = new BehaviorSubject<NewPagingData<IProductReview> | null>(null);
  private _review = new BehaviorSubject<NewResponseData<IProductReview> | null>(null);
  constructor(
    private productReviewService: ProductReviewService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get reviewsPaging$(): Observable<NewPagingData<IProductReview> | null> {
    return this._reviews.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get reviewPaging$(): Observable<NewResponseData<IProductReview> | null> {
    return this._review.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.productReviewService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._reviews.next(res.responseData);
      }
    });
  }

  create(payload: IProductReview) {
    return this.productReviewService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._review.next(res.responseData);
        this.toastService.showSuccess('Thêm mới đánh giá thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  update(payload: IProductReview) {
    return this.productReviewService.update(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._review.next(res.responseData);
        this.toastService.showSuccess('Cập nhật đánh giá thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }

  detail(id: any) {
    return this.productReviewService.detail(id).subscribe((res: NewResponseData<IProductReview>) => {
      this._review.next(res);
    });
  }

  delete(id: any) {
    return this.productReviewService.delete(id).subscribe((res) => {
      if (res) {
        this._review.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({ pageNumber: 1, pageSize: 10 });
      }
    });
  }
}
