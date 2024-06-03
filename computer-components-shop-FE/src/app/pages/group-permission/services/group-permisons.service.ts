// import { SocialSourceInfo, SocialSourceInput, UpdateSocialSourceInput, FilterSocialSourceInput } from '../models/page-facebook.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { IGrouppermissions } from "../models/group-permissions.model";
import { ApiService } from "../../../shared/services/api.service";
import { API_ROUTER } from "../../../shared/constants/api.constant";
import { PagingData } from "../../../shared/models/paging.model";


@Injectable({
    providedIn: 'root',
})
export class GrouppermissionsService {
    constructor(private apiService: ApiService) {}

    list(filter:any,sort:string, pageIndex:number, pageSize:number): Observable<PagingData<IGrouppermissions>> {
        return this.apiService.get( API_ROUTER.ACCOUNT.GET_GROUP_LIST, {...filter,  ordering:sort, page_index:pageIndex+1, page_size:pageSize} as HttpParams )
    }



    add(payload:any): Observable<IGrouppermissions> {
        return this.apiService.post(API_ROUTER.ACCOUNT.GROUP_ADD, payload as unknown as HttpParams)
    }


    update(id:number,payload:any): Observable<IGrouppermissions> {
            return this.apiService.post(`${API_ROUTER.ACCOUNT.GROUP_UPDATE}${id}`, payload as unknown as HttpParams)

    }


    detail(id:string): Observable<IGrouppermissions> {
        return this.apiService.get(`${API_ROUTER.ACCOUNT.GROUP_DETAIL}${id}`)


    }

    delete(id: string): Observable<any> {
        // delete payload.owner_id;
        return this.apiService.post(`${API_ROUTER.ACCOUNT.DELETE_GROUP}${id}`);
    }

    // add(payload:any): Observable<IGrouppermissions> {
    //     return this.apiService.post(`http://localhost:8000/api/v1/production/product`, payload as unknown as HttpParams)
    // }

    // validate(code:string): Observable<boolean> {
    //     return this.apiService.get(`http://localhost:8000/api/v1/production/product/product-code-validate/${code}`)
    // }

    // update(payload:IUnit): Observable<IUnit> {
    //     delete payload.owner_id
    //     return this.apiService.put(`http://localhost:8000/api/v1/base/unit/${payload.id}`, payload )
    // }

    // add(payload:IUnit): Observable<IUnit> {
    //     delete payload.owner_id
    //     return this.apiService.post(`http://localhost:8000/api/v1/base/unit`, payload )
    // }


}


// export class permissionsService {
//     constructor(private apiService: ApiService) {}

//     list(filter:any,sort:string, pageIndex:number, pageSize:number): Observable<PagingData<Ipermissions>> {
//         return this.apiService.get( API_ROUTER.ACCOUNT.GET_PERMISSION_LIST, {...filter,  ordering:sort, page_index:pageIndex+1, page_size:pageSize} as HttpParams )
//     }


// }
