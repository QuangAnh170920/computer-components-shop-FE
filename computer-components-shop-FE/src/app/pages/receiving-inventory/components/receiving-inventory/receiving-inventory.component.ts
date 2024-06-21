import { ReceivingInventoryDetailComponent } from './../receiving-inventory-detail/receiving-inventory-detail.component';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ReceivingInventoryFacade} from '../../facade/receiving-inventory.facade';
import { ConfirmationService } from 'primeng/api';
import { IReceivingInventory, ISearch } from '../../models/receiving-inventory.model';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';

@Component({
  selector: 'app-receiving-inventory',
  templateUrl: './receiving-inventory.component.html',
  styleUrls: ['./receiving-inventory.component.scss']
})
export class ReceivingInventoryComponent {
  searchTitle = 'Nhập mã đơn nhập hàng, tên sản phẩm, tên nhà cung cấp để tìm kiếm...'
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IReceivingInventory[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _receivingInventoryFacade: ReceivingInventoryFacade,
  ) {}

  ngOnInit() {
  }

  setActionBar() {
    return ['view', 'edit', 'del'];
  }

  actionClick(e: any, item: IReceivingInventory) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._receivingInventoryFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._receivingInventoryFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ đơn nhập hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._receivingInventoryFacade.delete(item.id);
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
        return 'Thêm mới đơn nhập hàng';

      case EFormAction.EDIT:
        return 'Cập nhật đơn nhập hàng';
      case EFormAction.VIEW:
        return 'Chi tiết đơn nhập hàng';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(ReceivingInventoryDetailComponent, {
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
