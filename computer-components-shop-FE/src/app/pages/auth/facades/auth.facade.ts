import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, distinctUntilChanged, filter, mergeMap, tap } from "rxjs";
import { ToastService } from "@shared/services/toast.service";
import { AuthService } from "../services/auth.service";
import { ILogin, IAuthInfo, IUserProfile } from "../models/auth.model";
import { SessionService } from "@shared/services/session.service";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    private _authInfo = new BehaviorSubject<IAuthInfo | null>(null)
    private loadingSubject = new Subject<boolean>();
    loading = this.loadingSubject.asObservable();
    constructor(private authService: AuthService, private sessionService: SessionService, private toastService: ToastService,
        private router: Router) { }

    get authInfo$(): Observable<IAuthInfo> {
        return this._authInfo.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }


    loadToken() {
        const _usrProfile = localStorage.getItem('__USRP')
        const _tknInfo = localStorage.getItem('__TKNI')
        if (_tknInfo && _usrProfile) {
            this._authInfo.next({
                user: JSON.parse(_usrProfile),
                accessToken: _tknInfo
            } as IAuthInfo)
        }
    }

    // Method
    login(login: ILogin, remember: boolean) {
        return this.authService.login(login).subscribe({
            next: (res) => {
                this.sessionService.serveSessionToken(res.responseData.accessToken);
                this.sessionService.saveRefreshToken(res.responseData.refreshToken);
                this.sessionService.rememberUser(remember, login)
                this._authInfo.next(res.responseData)
                this._authSaveStorage(res.responseData)
                this.toastService.showSuccess('Đăng nhập thành công!')
                this.router.navigate(['/']);
            },
            error: (err) => {
                if (err) {
                    this.loadingSubject.next(false);
                }
            },

        })
    }



    private _authSaveStorage(info: IAuthInfo) {
        localStorage.setItem('__USRP', JSON.stringify(info.user))
        localStorage.setItem('__TKNI', info.accessToken)
    }
    authSaveStorage(info: IAuthInfo){
        localStorage.setItem('__USRP', JSON.stringify(info.user))
        localStorage.setItem('__TKNI', info.accessToken)
    }
    // refresh_token(){

    //     return this.authService.refresh_token(localStorage.getItem('__TKNI') || '{}').subscribe({
    //         next: (res) => {
    //             this.sessionService.serveSessionToken(res.responseData.accessToken);
    //             // this.sessionService.rememberUser(remember, login)
    //             // this._authInfo.next(res.responseData)
    //             // this._authSaveStorage(res.responseData)
    //             this.toastService.showSuccess('Đăng nhập thành công!')
    //             // this.router.navigate(['/']);
    //         },
    //         error: (err) => {
    //             if (err) {
    //                 this.loadingSubject.next(false);
    //             }
    //         },
    //     })
    // }



}
