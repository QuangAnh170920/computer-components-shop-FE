import { Injectable } from "@angular/core";
import { PagingData, ResponseData } from "@shared/models/paging.model";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs"; 
import { ToastService } from "@shared/services/toast.service";
import { LazyLoadEvent } from "primeng/api";
import { convertFilter } from "@shared/utils/filter-params.util"; 
import { IFilterGroup, IGroup, IGrouppermissions } from "../models/group-permissions.model";
import { GrouppermissionsService } from "../services/group-permisons.service";


 
@Injectable({
    providedIn: 'root',
})
export class GroupPerFacade {  
    private _groups = new BehaviorSubject<PagingData<IGrouppermissions> | null>(null); 
    private _group = new BehaviorSubject<IGrouppermissions | null> (null) 
    private _success = new BehaviorSubject<any> (null) 
    constructor(private group_per_service: GrouppermissionsService, private toastService: ToastService) { }

    get _groupsPaging$(): Observable<PagingData<IGrouppermissions>> {
        return this._groups.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    } 

    get groupDetail$(): Observable<IGrouppermissions> {
        return this._group.asObservable().pipe(filter((res:any)=>res), distinctUntilChanged()) 
    }

    get success$(): Observable<any> {
        return this._success.asObservable().pipe(filter((res:any)=>res), distinctUntilChanged()) 
    } 
 


    // Method   
    filter (filterEvent?: LazyLoadEvent, keyword?:string) {
        const filter = convertFilter(filterEvent?.filters) as IFilterGroup;
        const sort = `${filterEvent?.sortOrder === -1 ? '' : '-'}${filterEvent?.sortField || 'create_at'}`
        if(keyword) {
            filter['keyword'] = keyword
        }
        return this.group_per_service.list(filter,  sort,
            filterEvent?.first ?? 0,
            filterEvent?.rows ?? 10).subscribe(res => {
                this._groups.next(res);
            })
    }
    detail(id:string) {
        return this.group_per_service.detail(id).subscribe(res=>{
            this._group.next(res)
        })
    }

    add (_group:IGrouppermissions) { 
        return this.group_per_service.add(_group).subscribe(res => { 
                return this.toastService.showSuccess('Đã thêm mới nhóm!')
        })
    }

    //update ( id:string, group:IGroup, permisson?:string[]) { 
    update ( id:number, _group:IGrouppermissions) { 

        return this.group_per_service.update(id, _group).subscribe(res => { 
                return this.toastService.showSuccess('Đã cập nhật thông tin nhóm!')
            })
    }

    delete(id: string) {
        return this.group_per_service.delete(id).subscribe(res => {
            this._success.next({result:res})
            return this.toastService.showSuccess('Da delete thanh cong')
        })
    }

  

}

