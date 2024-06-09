import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ProductManagementDetailComponent } from '../product-management-detail/product-management-detail.component';
import { TableLazyLoadEvent } from 'primeng/table';
import { ListDropdownEnum } from '../../../../common/list-dropdown-enum';
import { IProduct, ISearch } from '../../models/product-management.model';
import { ProductManagementFacade } from '../../facades/product-management.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchTitle = 'Nhập từ khóa là tên, mã sản phẩm...';
  statusDropDown = ListDropdownEnum.statusDropDownEnum();
  searchField: string = '';
  status: string | any;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IProduct[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _productFacade: ProductManagementFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._productFacade.search(this.searchPayload);
    this._productFacade.productsPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }

  setStatus(s: number) {
    return s === 1 ? 'Hoạt động' : 'Không hoạt động';
  }

  setStatusColor(s: number) {
    return s === 1 ? 'success' : 'warning';
  }

  setActionBar(s: number) {
    return s === 1
      ? ['view', 'edit', 'unapprove']
      : ['view', 'edit', 'del', 'approve'];
  }

  actionClick(e: any, item: IProduct) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._productFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._productFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ sản phẩm này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._productFacade.delete(item.id);
          },
          reject: () => {},
        });
        break;
      case EActionBar.APPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái sản phẩm này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '1'
            this._productFacade.approve(
              item.id,
              item.status);;
          },
          reject: () => {},
        });
        break;
      case EActionBar.UNAPPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái sản phẩm này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '2'
            this._productFacade.unapprove(
              item.id,
              item.status);
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
        return 'Thêm mới sản phẩm';

      case EFormAction.EDIT:
        return 'Cập nhật sản phẩm';
      case EFormAction.VIEW:
        return 'Chi tiết sản phẩm';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(ProductManagementDetailComponent, {
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

  onSearch(e: string) {
    this.searchField = e;
    this.lazyLoad(this.event);
  }
}
