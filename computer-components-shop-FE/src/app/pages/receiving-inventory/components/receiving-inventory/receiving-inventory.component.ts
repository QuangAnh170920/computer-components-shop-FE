import { ReceivingInventoryDetailComponent } from './../receiving-inventory-detail/receiving-inventory-detail.component';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ReceivingInventoryFacade } from '../../facade/receiving-inventory.facade';
import { ConfirmationService } from 'primeng/api';
import {
  IPayload,
  IReceivingInventory,
  ISearch,
  PaymentMethod,
} from '../../models/receiving-inventory.model';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';

@Component({
  selector: 'app-receiving-inventory',
  templateUrl: './receiving-inventory.component.html',
  styleUrls: ['./receiving-inventory.component.scss'],
})
export class ReceivingInventoryComponent {
  searchTitle =
    'Nhập mã đơn nhập hàng, tên sản phẩm, tên nhà cung cấp để tìm kiếm...';
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    type: '1',
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IReceivingInventory[] = [];
  totalRecords: number = 0;
  searchField: string = '';
  status: string | any;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _receivingInventoryFacade: ReceivingInventoryFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._receivingInventoryFacade.search(this.searchPayload);
    this._receivingInventoryFacade.receivingInventorysPaging$.subscribe(
      (res) => {
        if (res) {
          this.listDataSearchInit = res.content || [];
          this.totalRecords = res.totalElements || 0;
        }
      }
    );
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

  setPaymentMethodColor(p: number): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
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

  setPaymentStatusColor(paymentStatus: number): "success" | "danger" | "warning" | "info" | "secondary" | "contrast" | undefined {
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
      case EActionBar.APPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái đơn hàng này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '2';
            this._receivingInventoryFacade.approve(item.id, item.status);
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
            this._receivingInventoryFacade.unapprove(item.id, item.status);
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

  onSearch(e: string) {
    this.searchField = e;
    this.lazyLoad(this.event);
  }
}
