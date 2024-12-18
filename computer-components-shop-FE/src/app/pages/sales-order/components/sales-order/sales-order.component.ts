import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ListDropdownEnum } from '../../../../common/list-dropdown-enum';
import { ConfirmationService } from 'primeng/api';
import { SalesOrderService } from '../../services/sales-order.service';
import { SaleOrderFacade } from '../../facade/sales-order.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { SalesOrderDetailComponent } from '../sales-order-detail/sales-order-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { IOrders, IPayload, ISearch } from '../../models/sales-order.model';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchTitle = 'Nhập từ khóa là tên, mã đơn hàng...';
  statusDropDown = ListDropdownEnum.statusDropDownEnum();
  searchField: string = '';
  status: string | any;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IOrders[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _saleOrderService: SalesOrderService,
    private _saleOrderFacade: SaleOrderFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._saleOrderFacade.search(this.searchPayload);
    this._saleOrderFacade.saleOrdersPaging$.subscribe((res) => {
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

  actionClick(e: any, item: IPayload) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._saleOrderFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._saleOrderFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ đơn hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._saleOrderFacade.delete(item.id);
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
        return 'Thêm mới đơn hàng';

      case EFormAction.EDIT:
        return 'Cập nhật đơn hàng';
      case EFormAction.VIEW:
        return 'Chi tiết đơn hàng';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(SalesOrderDetailComponent, {
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
