import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ISearch, IWareHouse } from '../../models/warehouse.model';
import { ConfirmationService } from 'primeng/api';
import { WareHouseFacade } from '../../facade/warehouse.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { WarehouseDetailComponent } from '../warehouse-detail/warehouse-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {
  searchTitle = 'Nhập mã đơn nhập hàng, tên sản phẩm để tìm kiếm...'
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IWareHouse[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _wareHouseFacade: WareHouseFacade,
  ) {}

  ngOnInit() {
  }

  setActionBar() {
    return ['view', 'edit', 'del'];
  }

  actionClick(e: any, item: IWareHouse) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._wareHouseFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._wareHouseFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ sản phẩm này trong kho?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._wareHouseFacade.delete(item.id);
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
        return 'Thêm mới kho hàng';

      case EFormAction.EDIT:
        return 'Cập nhật kho hàng';
      case EFormAction.VIEW:
        return 'Chi tiết kho hàng';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(WarehouseDetailComponent, {
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
