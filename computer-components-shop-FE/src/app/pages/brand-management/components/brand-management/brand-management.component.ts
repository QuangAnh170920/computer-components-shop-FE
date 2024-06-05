import { Component } from '@angular/core';
import { BrandManagementDetailComponent } from '../brand-management-detail/brand-management-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ListDropdownEnum } from '../../../../common/list-dropdown-enum';
import { BrandManagementService } from '../../services/brand-management.service';
import { IBrand, ISearch } from '../../models/brand-management.model';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss'],
})
export class BrandManagementComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchTitle = 'Nhập từ khóa là tên, mã thương hiệu...';
  statusDropDown = ListDropdownEnum.statusDropDownEnum();
  searchField: string = '';
  status: number | any;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IBrand[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _brandService: BrandManagementService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this._brandService.search(this.searchPayload).subscribe((res: any) => {
      if (res) {
        this.listDataSearchInit = res.responseData?.content;
        console.log(this.listDataSearchInit);
        this.totalRecords = res.responseData?.totalElements;
      }
    });
  }

  setStatus(s: boolean) {
    return s ? 'Hoạt động' : 'Không hoạt động';
  }

  setStatusColor(s: boolean) {
    return s ? 'success' : 'warning';
  }

  setActionBar(s: boolean) {
    return s
      ? ['view', 'edit', 'unapprove']
      : ['view', 'edit', 'del', 'approve'];
  }

  actionClick(e: any, item: IBrand) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._brandService.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._brandService.detail(item.id);
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
            this._brandService.delete(item.id);
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
            // this._brandService.approve(item.id);
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
            // this._brandService.unapprove(item.id);
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
        return 'Thêm mới nhãn hiệu';

      case EFormAction.EDIT:
        return 'Cập nhật nhãn hiệu';
      case EFormAction.VIEW:
        return 'Chi tiết nhãn hiệu';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(BrandManagementDetailComponent, {
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
