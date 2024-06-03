import { Component } from '@angular/core';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PermissionFacade } from '../../facades/permissons.facade';
import { IPermissions } from '../../models/permissons.model';
import { PagingData } from '../../../../shared/models/paging.model';
import { EToolBarAction } from '../../../../shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '../../../../shared/models/form.model';
import { LazyLoadEvent } from 'primeng/api';




@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent {
  constructor( private _perFacade: PermissionFacade,   private dialogService:DialogService) {}
  keyword?:string
  rows = 10;
  event?: LazyLoadEvent;
  first = 1;
  selectedItems: any[] = [];
  data:any;
  totalRecords:number = 0
  searchTitle = 'Nhập từ khóa tên quyền'

  status = [
    { name: 'Trạng thái', value: null },
    { name: 'Kích hoạt', value: true },
    { name: 'Tạm dừng', value: false },
  ]


  searchParams = {
    keyword: null,
    status:null
  }

  ngOnInit() {

    this._perFacade.permissionsPaging$.subscribe((res:PagingData<IPermissions>)=>{
      this.data = res.items!
      this.totalRecords = res.total_records
    })

  }



  lazyLoad(event?: any) {
    if (event) {
      this.event = event;
    } else {
      this.first = 1;
    }
    this._perFacade.filter(this.event, this.keyword);
  }

  detail(item:IPermissions) {
    // this.dialogService.open(ContractDetailComponent, {...item})
    // this._loadDialog({...item})
  }

  actionClick(e:any, item:IPermissions) {
    // switch(e as EActionBar) {
    //   case EActionBar.VIEW:
    //     // this.categoryFacade.filterContractCategories()
    //     this._groupPerFacade.detail(item.id)
    //     // this.dialogService.open(ContractDetailComponent, {action:EFormAction.VIEW, item: item.id} as IFormConfig)
    //     this._loadDialog({action:EFormAction.VIEW, item: item.id}, e as unknown as EFormAction )
    //   break;
    //   case EActionBar.EDIT:

    //   break;

    //   default:


    // }
  }

  toolbarOnClick(e:EToolBarAction) {
    switch(e){
      case EToolBarAction.NEW:
        // const ref =  this.dialogService.open(ContractDetailComponent, {action:EFormAction.INSERT, item: null} as IFormConfig)
        // ref.afterClosed.subscribe((res:any)=>{
        //   this.lazyLoad(this.event)
        // })
  this._loadDialog({action:EFormAction.INSERT, item: null}, e as unknown as EFormAction)
      break;
      case EToolBarAction.CLONE:

      break
    }
  }

  onSearch(e:string) {
    this.keyword = e
    this.lazyLoad(this.event)
  }

  private _loadDialog(data:any, e:EFormAction) {
    const _title = this._setFormTitle(e)
  //   const ref = this.dialogService.open(GrouppermissionsDetailComponent, {
  //     header: _title,
  //     width: '50%',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 10000,
  //     maximizable: true,
  //     data: data
  // });
  }

  private _setFormTitle(t:EFormAction) {
    switch(t){
      case EFormAction.INSERT:
      case EFormAction.CLONE:
      return 'Thêm mới quyền'

      case EFormAction.EDIT:
        return 'Cập nhật quyền'
      case EFormAction.VIEW:
        return 'Chi tiết quyền'
    }

  }
}
