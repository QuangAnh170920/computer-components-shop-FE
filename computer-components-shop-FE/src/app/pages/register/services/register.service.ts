import { ApiService } from "@shared/services/api.service";
import { IRegister, IResponse} from "../models/register.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API_ROUTER } from "@shared/constants/api.constant";
import { HttpParams } from "@angular/common/http";
@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private apiService: ApiService) { }

    register(payload: IRegister): Observable<IResponse> {
        return this.apiService.post(API_ROUTER.REGISTER.REGISTER_FORM, payload)
    }
    verify(email: string, otp: string) {
        const params = new HttpParams()
            .set('email', email)
            .set('otp', otp);
        return this.apiService.get(`${API_ROUTER.REGISTER.VERIFY}`, params)
    }
}