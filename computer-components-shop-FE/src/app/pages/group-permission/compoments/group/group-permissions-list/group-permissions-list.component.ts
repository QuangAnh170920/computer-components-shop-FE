import { Component } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { IGroup, IGrouppermissions } from '../../../models/group-permissions.model';
import { GroupPerFacade } from '../../../facades/group-permissons.facade';
import { GroupPermissionsDetailComponent } from '../group-permissons-detail/group-permissions-detail.component';
import { ConfirmationService } from 'primeng/api';
import { PagingData } from '../../../../../shared/models/paging.model';
import { EActionBar } from '../../../../../shared/components/p-actionbar/models/p-actionbar.model';
import { EFormAction } from '../../../../../shared/models/form.model';
import { EToolBarAction } from '../../../../../shared/components/p-toolbar/models/toolbar.model';



@Component({
  selector: 'app-group-permissions',
  templateUrl: './group-permissions-list.component.html',
  styleUrls: ['./group-permissions-list.component.scss']
})
export class GrouppermissionsListComponent {
  constructor( private _groupPerFacade: GroupPerFacade,   private dialogService:DialogService, private confirmationService : ConfirmationService) {}
  keyword?:string
  rows = 10;
  event?: LazyLoadEvent;  
  first = 1;
  selectedItems: any[] = [];
  data:IGrouppermissions[] = [] 
  totalRecords:number = 0
  searchTitle = 'Nhập từ khóa tên nhóm quyền'


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

    this._groupPerFacade._groupsPaging$.subscribe((res:PagingData<IGrouppermissions>)=>{
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
    this._groupPerFacade.filter(this.event, this.keyword);
  }

  actionClick(e:any, item:IGroup) {   
    switch(e as EActionBar) {
      case EActionBar.VIEW:       
        this._groupPerFacade.detail(item.id)        
        this._loadDialog({action:EFormAction.VIEW, item: item.id}, e as unknown as EFormAction )
      break;
      case EActionBar.EDIT:
        this._groupPerFacade.detail(item.id)
        this._loadDialog({action:EFormAction.EDIT, item: item.id}, e as unknown as EFormAction)
  
      break;
      case EActionBar.DEL:   
      
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa bỏ nhóm quyền này?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => { 
          this._groupPerFacade.delete(item.id)
          this._groupPerFacade.success$.subscribe(res=>{
            if (res?.result) {
              this.lazyLoad()
            }
          })        },
        reject: () => { }
      })

    
      break;
      default:
    }
  }

  toolbarOnClick(e:EToolBarAction) {
    switch(e){
      case EToolBarAction.NEW:         
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
    const ref = this.dialogService.open(GroupPermissionsDetailComponent, {
      header: _title,
      footer:' ',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
     });
  ref.onClose.subscribe((res: any) => {
    this.lazyLoad();
});
  }
 
  private _setFormTitle(t:EFormAction) {
    switch(t){
      case EFormAction.INSERT:
      case EFormAction.CLONE:
      return 'Thêm mới nhóm quyền'
      
      case EFormAction.EDIT:
        return 'Cập nhật nhóm quyền'
      case EFormAction.VIEW:
        return 'Chi tiết nhóm quyền'
    }

  }
}
