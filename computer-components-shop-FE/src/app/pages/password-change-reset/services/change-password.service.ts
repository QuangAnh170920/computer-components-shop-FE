import { ApiService } from "@shared/services/api.service";
import { Observable } from "rxjs";
import { IChangePassword, IResponse} from "../models/password.model";
import { API_ROUTER } from "@shared/constants/api.constant";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class  ChangePasswordService{
    constructor(private apiService: ApiService) {}
    sendOTP(identityContent: string): Observable<IResponse>{
        const params = new HttpParams()
        .set('identityContent', identityContent)
        return this.apiService.get(API_ROUTER.PASSWORD.OTP_FORGOT_PASSWORD, params);
    }
    changePassword(payload: IChangePassword): Observable<IResponse>{
      return this.apiService.post(API_ROUTER.PASSWORD.FORGOT_PASSWORD, payload)
    }
}