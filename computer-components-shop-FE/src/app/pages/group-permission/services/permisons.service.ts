// import { SocialSourceInfo, SocialSourceInput, UpdateSocialSourceInput, FilterSocialSourceInput } from '../models/page-facebook.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";      
import { ApiService } from "@shared/services/api.service";
import { HttpParams } from "@angular/common/http";
import { PagingData, ResponseData } from "@shared/models/paging.model";  

import { API_ROUTER } from "@shared/constants/api.constant";
import { IPermissions } from "../models/permissons.model";


@Injectable({
    providedIn: 'root',
})


export class permissionsService {
    constructor(private apiService: ApiService) {} 

    list(filter:any,sort:string, pageIndex:number, pageSize:number): Observable<PagingData<any>> { 
        return this.apiService.get( API_ROUTER.ACCOUNT.GET_PERMISSION_LIST, {...filter,  ordering:sort, page_index:pageIndex+1, page_size:pageSize} as HttpParams ) 
    }


    
    

    list_group_permission(filter:any,sort:string, pageIndex:number, pageSize:number): Observable<PagingData<IPermissions>> { 
        return this.apiService.get( API_ROUTER.ACCOUNT.GET_GROUP_PERMISSION_LIST, {...filter,  ordering:sort, page_index:pageIndex+1, page_size:pageSize} as HttpParams ) 
    }

  
}