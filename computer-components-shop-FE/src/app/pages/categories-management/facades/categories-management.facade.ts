import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  distinctUntilChanged,
  catchError,
  of,
} from 'rxjs';
import { NewPagingData, NewResponseData } from '../../../shared/models/paging.model';
import { ToastService } from '../../../shared/services/toast.service';
import { ICategories, ISearch } from '../models/categories-management.model';
import { CategoriesManagementService } from '../services/categories-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DropListService } from '../../../shared/services/drop-list.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesManagementFacade {
  private _id = new BehaviorSubject<any | null>(null);
  private _categories = new BehaviorSubject<NewPagingData<ICategories> | null>(
    null
  );
  private _category = new BehaviorSubject<NewResponseData<ICategories> | null>(null);
  private _categoriesParent = new BehaviorSubject<NewPagingData<ICategories> | null>(
    null
  );
  constructor(
    private categoriesService: CategoriesManagementService,
    private _dropListService: DropListService,
    private toastService: ToastService
  ) {}

  get id$(): Observable<any> {
    return this._id.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get categoriesPaging$(): Observable<NewPagingData<ICategories> | null> {
    return this._categories.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get categoryPaging$(): Observable<NewResponseData<ICategories> | null> {
    return this._category.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  get categoriesParentPaging$(): Observable<NewPagingData<ICategories> | null> {
    return this._categoriesParent.asObservable().pipe(
      filter((res) => res !== null),
      distinctUntilChanged()
    );
  }

  search(payload: ISearch) {
    this.categoriesService.search(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._categories.next(res.responseData);
      }
    });
  }

  create(payload: ICategories) {
    return this.categoriesService.create(payload).subscribe((res) => {
      if (res && res.responseData) {
        this._category.next(res.responseData);
        this.toastService.showSuccess('Thêm mới loại sản phẩm thành công');
        this.search({});
      }
    });
  }

  update(payload: ICategories) {
    return this.categoriesService.update(payload).pipe(
      catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          const errorMessage = error.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
          this.toastService.showError(errorMessage);
        } else {
          this.toastService.showError('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } else {
        this.toastService.showError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
      return of(null);
      })
    ).subscribe((res) => {
      if (res && res.responseData) {
        this._category.next(res.responseData);
        this.toastService.showSuccess('Cập nhật loại sản phẩm thành công');
        this.search({});
      }
    });
  }

  approve(id: any, status: string) {
    return this.categoriesService.approve(id, status).subscribe((res) => {
      if (res) {
        this._category.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái thành công');
        this.search({});
      }
    });
  }

  unapprove(id: any, status: string) {
    return this.categoriesService.unapprove(id, status).subscribe((res) => {
      if (res) {
        this._category.next(res.responseData);
        this.toastService.showSuccess('Cập nhật trạng thái thành công');
        this.search({});
      }
    });
  }

  detail(id: any) {
    return this.categoriesService.detail(id).subscribe((res: NewResponseData<ICategories>) => {
      this._category.next(res);
    });
  }

  delete(id: any) {
    return this.categoriesService.delete(id).subscribe((res) => {
      if (res) {
        this._category.next(res);
        this.toastService.showSuccess('Xóa thông tin thành công');
        this.search({});
      }
    });
  }

  parentList(id: any) {
    this._dropListService.getCategoriesParentList(id).subscribe((res) => {
      if (res && res.responseData) {
        this._categoriesParent.next(res.responseData);
      }
    });
  }
}
