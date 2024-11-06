import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { IProductReview, ISearch } from '../../models/product-review.model';
import { ConfirmationService } from 'primeng/api';
import { ProductReviewService } from '../../services/product-review.service';
import { ProductReviewFacade } from '../../facade/product-review.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ProductManagementDetailComponent } from '../../../product-management/components/product-management-detail/product-management-detail.component';
import { ProductReviewDetailComponent } from '../product-review-detail/product-review-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { DropListService } from '../../../../shared/services/drop-list.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IProductReview[] = [];
  totalRecords: number = 0;
  productList: any[] = [];
  productId: number | any;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _productReview: ProductReviewService,
    private _productReviewFacade: ProductReviewFacade,
    private _dropListService: DropListService
  ) {}

  ngOnInit() {
    this.loadData();
    this.getProductList();
  }

  loadData() {
    this._productReviewFacade.search(this.searchPayload);
    this._productReviewFacade.reviewsPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }

  getProductList() {
    this._dropListService.getProductList().subscribe((res: any) => {
      if (res) {
        this.productList = res.responseData;
      }
    });
    
  }

  setActionBar() {
    return ['view', 'edit', 'del'];
  }

  actionClick(e: any, item: IProductReview) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._productReviewFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._productReviewFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ đánh giá này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._productReviewFacade.delete(item.id);
          },
          reject: () => {},
        });
        break;
      default:
    }
  }

  lazyLoad(event?: TableLazyLoadEvent) {
    if (event) {
      this.event = event;
    } else {
      this.first = 1;
    }
  }

  private _setFormTitle(t: EFormAction) {
    switch (t) {
      case EFormAction.INSERT:
      case EFormAction.CLONE:
        return 'Thêm mới đánh giá';

      case EFormAction.EDIT:
        return 'Cập nhật đánh giá';
      case EFormAction.VIEW:
        return 'Chi tiết đánh giá';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(ProductReviewDetailComponent, {
      header: _title,
      footer: ' ',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data,
    });

    this.ref?.onClose.subscribe((res) => {
      this.lazyLoad();
    });
  }

  toolbarOnClick(e: EToolBarAction) {
    switch (e) {
      case EToolBarAction.NEW:
        this._loadDialog(
          { action: EFormAction.INSERT, item: null },
          e as unknown as EFormAction
        );
        break;

      case EToolBarAction.CLONE:
        break;
    }
  }

  onSearch(id: number) {
    this._productReviewFacade.search({
      ...this.searchPayload,
      productId: id,
    });
    this._productReviewFacade.reviewsPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }
}
