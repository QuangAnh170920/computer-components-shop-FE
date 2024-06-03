// import { SocialSourceInfo, SocialSourceInput, UpdateSocialSourceInput, FilterSocialSourceInput } from '../models/page-facebook.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IAuthInfo, ILogin, IResponseLogin, IUserProfile } from "../models/auth.model";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "../../../shared/services/api.service";
import { API_ROUTER } from "../../../shared/constants/api.constant";
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    login(payload:ILogin): Observable<IResponseLogin> {
        return this.apiService.post(API_ROUTER.ACCOUNT.LOGIN, payload)
    }
    loginSSO(payload:ILogin): Observable<IAuthInfo> {
        return this.apiService.post(API_ROUTER.ACCOUNT.LOGIN_SSO, payload)
    }

    group_list(payload:ILogin): Observable<IUserProfile> {
        return this.apiService.post(API_ROUTER.ACCOUNT.GET_GROUP_LIST, payload)
    }
    
    refresh_token(tokenRefresh: string): Observable<IResponseLogin>{
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
         console.log(tokenRefresh, 1213);
         
        const formData = new FormData();
        formData.append('tokenRefresh', tokenRefresh.toString());
        console.log(formData,"huy chs")
        
        return this.apiService.postFormData(`${API_ROUTER.ACCOUNT.REFRESH_TOKEN}`, formData)
    }
    // validate(code:string): Observable<boolean> {
    //     return this.apiService.get(`${API_ROUTER.QRCODE.CODE_VALIDATE}/${code}`)
    // }


    // listCodeTypes(filter:any,sort:string, pageIndex:number, pageSize:number): Observable<PagingData<IAuthType>> {
    //     return this.apiService.get(API_ROUTER.QRCODE.GET_LIST_CODE_TYPES, {...filter,  ordering:sort, page_index:pageIndex+1, page_size:pageSize} as HttpParams )
    // }

    // codeSerialRange(rangeInput:ICodeSerialRangeInput): Observable<ICodeSerialRange> {
    //     return this.apiService.post(API_ROUTER.QRCODE.GET_SERIAL_RANGE, rangeInput)
    // }

}
