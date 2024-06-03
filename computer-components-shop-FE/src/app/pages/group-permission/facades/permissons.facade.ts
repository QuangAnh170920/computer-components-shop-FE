import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs"; 
import { LazyLoadEvent } from "primeng/api";
import { permissionsService } from "../services/permisons.service";
import { IPermissions } from "../models/permissons.model";
import { IFilterGroup } from "../models/group-permissions.model";
import { PagingData } from "../../../shared/models/paging.model";
import { ToastService } from "../../../shared/services/toast.service";
import { convertFilter } from "../../../shared/utils/filter-params.util";



 
@Injectable({
    providedIn: 'root',
})
export class PermissionFacade {  
    private _permissions = new BehaviorSubject<PagingData<IPermissions> | null>(null); 
    private _permisson = new BehaviorSubject<IPermissions | null> (null) 
    private _grouppermissions = new BehaviorSubject<any>(null); 
    constructor(private _per_service: permissionsService, private toastService: ToastService) { }

    get permissionsPaging$(): Observable<PagingData<IPermissions>> {
        return this._permissions.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    } 

    get grouppermissions$(): Observable<any> {
        return this._grouppermissions.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    } 


    get groupDetail$(): Observable<IPermissions> {
        return this._permisson.asObservable().pipe(filter((res:any)=>res), distinctUntilChanged()) 
    }
 
    // Method   
    filter (filterEvent?: LazyLoadEvent, keyword?:string) {
        const filter = convertFilter(filterEvent?.filters) as IFilterGroup;
        const sort = `${filterEvent?.sortOrder === -1 ? '' : '-'}${filterEvent?.sortField || 'module_code'}`
        if(keyword) {
            filter['keyword'] = keyword
        }
        return this._per_service.list(filter,  sort,
            filterEvent?.first ?? 0,
            filterEvent?.rows ?? 100).subscribe(res => {
                this._permissions.next(res);
            })
    }  

    groupPermissionFilter (filterEvent?: LazyLoadEvent, keyword?:string) {
        const filter = convertFilter(filterEvent?.filters) as IFilterGroup;
        const sort = `${filterEvent?.sortOrder === -1 ? '' : '-'}${filterEvent?.sortField || 'module_code' || 'model_name'}`
        if(keyword) {
            filter['keyword'] = keyword
        }
        return this._per_service.list_group_permission(filter,  sort,
            filterEvent?.first ?? 0,
            filterEvent?.rows ?? 1000).subscribe(res => {
                // const _res = Object.entries(res).map((item:any)=>item)!
                this._grouppermissions.next(res);
            })
    }  


}