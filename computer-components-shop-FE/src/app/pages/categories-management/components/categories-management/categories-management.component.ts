import { Component } from '@angular/core';
import { CategoriesManagementDetailComponent } from '../categories-management-detail/categories-management-detail.component';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ListDropdownEnum } from '../../../../common/list-dropdown-enum';
import { ICategories, ISearch } from '../../models/categories-management.model';
import { CategoriesManagementFacade } from '../../facades/categories-management.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss'],
})
export class CategoriesManagementComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchTitle = 'Nhập từ khóa là tên, mã loại sản phẩm...';
  searchField: string = '';
  status: string | any;
  statusDropDown = ListDropdownEnum.statusDropDownEnum();
  listDataSearchInit: ICategories[] = [];
  totalRecords: number = 0;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _categoriesFacade: CategoriesManagementFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._categoriesFacade.search(this.searchPayload);
    this._categoriesFacade.categoriesPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
        console.log(this.listDataSearchInit, '22222');
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

  actionClick(e: any, item: ICategories) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._categoriesFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._categoriesFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ thương hiệu này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._categoriesFacade.delete(item.id);
          },
          reject: () => {},
        });
        break;
      case EActionBar.APPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái nhãn hiệu này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '1'
            this._categoriesFacade.approve(
              item.id,
              item.status);;
          },
          reject: () => {},
        });
        break;
      case EActionBar.UNAPPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái nhãn hiệu này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '2'
            this._categoriesFacade.unapprove(
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
        return 'Thêm mới loại sản phẩm';

      case EFormAction.EDIT:
        return 'Cập nhật loại sản phẩm';
      case EFormAction.VIEW:
        return 'Chi tiết loại sản phẩm';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(CategoriesManagementDetailComponent, {
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
