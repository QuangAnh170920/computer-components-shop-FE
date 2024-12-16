import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import {
  IPayload,
  ISearch,
  IShippingInventory,
} from '../../models/shipping-inventory.model';
import { ConfirmationService } from 'primeng/api';
import { ShippingInventoryService } from '../../services/shipping-inventory.service';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { ShippingInventoryDetailComponent } from '../shipping-inventory-detail/shipping-inventory-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { ShippingInventoryFacade } from '../../facade/shipping-inventory.facade';

@Component({
  selector: 'app-shipping-inventory',
  templateUrl: './shipping-inventory.component.html',
  styleUrls: ['./shipping-inventory.component.scss'],
})
export class ShippingInventoryComponent {
  searchTitle =
    'Nhập mã đơn xuất hàng, tên sản phẩm, tên nhà cung cấp để tìm kiếm...';
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    type: '2',
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IShippingInventory[] = [];
  totalRecords: number = 0;
  searchField: string = '';
  status: string | any;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _shippingInventoryFacade: ShippingInventoryFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._shippingInventoryFacade.search(this.searchPayload);
    this._shippingInventoryFacade.shippingInventorysPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }

  setStatus(s: number) {
    return s === 2 ? 'Đã duyệt' : 'Chờ duyệt';
  }

  setStatusColor(s: number) {
    return s === 2 ? 'success' : 'warning';
  }

  setPaymentMethod(p: number): string {
    if (p === 1) {
      return 'Tiền mặt';
    } else if (p === 2) {
      return 'Chuyển khoản';
    } else if (p === 3) {
      return 'Thanh toán di động';
    } else {
      return 'Không xác định';
    }
  }

  setPaymentMethodColor(
    p: number
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    if (p === 1) {
      return 'success';
    } else if (p === 2) {
      return 'info';
    } else if (p === 3) {
      return 'warning';
    } else {
      return undefined;
    }
  }

  setPaymentStatus(paymentStatus: number): string {
    switch (paymentStatus) {
      case 1:
        return 'Chờ thanh toán';
      case 2:
        return 'Đã thanh toán';
      case 3:
        return 'Thanh toán thất bại';
      case 4:
        return 'Đã hủy';
      case 5:
        return 'Đang xử lý thanh toán';
      case 6:
        return 'Tạm dừng';
      default:
        return 'Không xác định';
    }
  }

  setPaymentStatusColor(
    paymentStatus: number
  ):
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'secondary'
    | 'contrast'
    | undefined {
    switch (paymentStatus) {
      case 1:
        return 'warning'; // Chờ thanh toán
      case 2:
        return 'success'; // Đã thanh toán
      case 3:
        return 'danger'; // Thanh toán thất bại
      case 4:
        return 'secondary'; // Đã hủy
      case 5:
        return 'info'; // Đang xử lý thanh toán
      case 6:
        return 'warning'; // Tạm dừng
      default:
        return undefined; // Trường hợp không xác định
    }
  }

  setActionBar(s: number) {
    return s === 2
      ? ['view', 'edit', 'unapprove']
      : ['view', 'edit', 'del', 'approve'];
  }

  actionClick(e: any, item: IPayload) {
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
      case EActionBar.APPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái đơn hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '2';
            this._shippingInventoryFacade.approve(item.id, item.status);
          },
          reject: () => {},
        });
        break;
      case EActionBar.UNAPPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái đơn hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '1';
            this._shippingInventoryFacade.unapprove(item.id, item.status);
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

  onSearch(e: string) {
    this.searchField = e;
    this.lazyLoad(this.event);
  }
}
