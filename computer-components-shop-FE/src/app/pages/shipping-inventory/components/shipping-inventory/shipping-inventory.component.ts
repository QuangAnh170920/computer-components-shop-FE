import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ISearch, IShippingInventory } from '../../models/shipping-inventory.model';
import { ConfirmationService } from 'primeng/api';
import { ShippingInventoryService } from '../../services/shipping-inventory.service';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ShippingInventoryDetailComponent } from '../shipping-inventory-detail/shipping-inventory-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';

@Component({
  selector: 'app-shipping-inventory',
  templateUrl: './shipping-inventory.component.html',
  styleUrls: ['./shipping-inventory.component.scss']
})
export class ShippingInventoryComponent {
  searchTitle = 'Nhập mã đơn xuất hàng, tên sản phẩm, tên nhà cung cấp để tìm kiếm...'
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IShippingInventory[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _shippingInventoryFacade: ShippingInventoryService,
  ) {}

  ngOnInit() {
  }

  setActionBar() {
    return ['view', 'edit', 'del'];
  }

  actionClick(e: any, item: IShippingInventory) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._shippingInventoryFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._shippingInventoryFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ đơn xuất hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._shippingInventoryFacade.delete(item.id);
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
        return 'Thêm mới đơn xuất hàng';

      case EFormAction.EDIT:
        return 'Cập nhật đơn xuất hàng';
      case EFormAction.VIEW:
        return 'Chi tiết đơn xuất hàng';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(ShippingInventoryDetailComponent, {
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
}
