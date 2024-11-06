import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ISearch, IWareHouse } from '../../models/warehouse.model';
import { ConfirmationService } from 'primeng/api';
import { WareHouseFacade } from '../../facade/warehouse.facade';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {
  searchTitle = 'Nhập mã, tên sản phẩm để tìm kiếm...'
  ref?: DynamicDialogRef;
  event?: TableLazyLoadEvent;
  first = 1;
  searchPayload: ISearch = {
    pageNumber: 1,
    pageSize: 10,
  };
  listDataSearchInit: IWareHouse[] = [];
  totalRecords: number = 0;
  searchField: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private _wareHouseFacade: WareHouseFacade,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._wareHouseFacade.search(this.searchPayload);
    this._wareHouseFacade.wareHousesPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }

  lazyLoad(event?: TableLazyLoadEvent) {
    if (event) {
      this.event = event;
    } else {
      this.first = 1;
    }
  }

  onSearch(e: string) {
    this._wareHouseFacade.search({
      ...this.searchPayload,
      searchField: e,
    });
    this._wareHouseFacade.wareHousesPaging$.subscribe((res) => {
      if (res) {
        this.listDataSearchInit = res.content || [];
        this.totalRecords = res.totalElements || 0;
      }
    });
  }
}
