import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { IChangePassword, IResponse, IUser } from '../models/user.model';
import { API_ROUTER } from '@shared/constants/api.constant';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    userInfo(): Observable<IResponse> {
        return this.apiService.get(`${API_ROUTER.VERSION.VERSION1}`+`${API_ROUTER.ADMIN.PROFILE}`);
    }

    changePassword(payload: IChangePassword): Observable<IResponse>{
        return this.apiService.put(`${API_ROUTER.VERSION.VERSION1}`+`${API_ROUTER.PASSWORD.CHANGE_PASSWORD}`, payload)
    }

    // editUserProfile(userProfile: IUser): Observable<IUser> {
    //     return this.apiService.put(API_ROUTER.USER.EDIT_PROFILE, userProfile);
    // }
}
