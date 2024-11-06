import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ListDropdownEnum } from '../../../../common/list-dropdown-enum';
import { IPromotion, ISearch } from '../../models/promotion.model';
import { ConfirmationService } from 'primeng/api';
import { PromotionService } from '../../services/promotion.service';
import { PromotionFacade } from '../../facade/promotion.facade';
import { EActionBar } from '../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { PromotionDetailComponent } from '../promotion-detail/promotion-detail.component';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchTitle = 'Nhập từ khóa là tên, mã khuyến mãi...';
  statusDropDown = ListDropdownEnum.statusDropDownEnum();
  searchField: string = '';
  status: string | any;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IPromotion[] = [];
  totalRecords: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _promotionService: PromotionService,
    private _promotionFacade: PromotionFacade
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._promotionFacade.search(this.searchPayload);
    this._promotionFacade.promotionsPaging$.subscribe((res) => {
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

  actionClick(e: any, item: IPromotion) {
    switch (e as EActionBar) {
      case EActionBar.VIEW:
        this._promotionFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.VIEW, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.EDIT:
        this._promotionFacade.detail(item.id);
        this._loadDialog(
          { action: EFormAction.EDIT, item: item.id },
          e as unknown as EFormAction
        );
        break;
      case EActionBar.DEL:
        this.confirmationService.confirm({
          message: 'Bạn muốn xóa bỏ khuyến mãi này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._promotionFacade.delete(item.id);
          },
          reject: () => {},
        });
        break;
      case EActionBar.APPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái khuyến mãi này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '1'
            this._promotionFacade.approve(
              item.id,
              item.status);;
          },
          reject: () => {},
        });
        break;
      case EActionBar.UNAPPROVE:
        this.confirmationService.confirm({
          message: 'Bạn muốn chuyển trạng thái khuyến mãi này?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            item.status = '2'
            this._promotionFacade.unapprove(
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
        return 'Thêm mới khuyến mãi';

      case EFormAction.EDIT:
        return 'Cập nhật khuyến mãi';
      case EFormAction.VIEW:
        return 'Chi tiết khuyến mãi';
    }
  }

  private _loadDialog(data: any, e: EFormAction) {
    const _title = this._setFormTitle(e);
    const ref = this.dialogService.open(PromotionDetailComponent, {
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
