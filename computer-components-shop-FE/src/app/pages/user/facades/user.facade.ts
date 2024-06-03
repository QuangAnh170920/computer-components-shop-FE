import { Injectable } from '@angular/core';
import { UserService } from '../services/services';
import { ToastService } from '@shared/services/toast.service';
import { IChangePassword, IResponse, IUser } from '../models/user.model';
import {
    BehaviorSubject,
    Observable,
    Subject,
    distinctUntilChanged,
    filter,
} from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services/session.service';

@Injectable({
    providedIn: 'root',
})
export class UserFacade {
    private _id = new BehaviorSubject<any | null>(null);
    private _userInfo = new BehaviorSubject<IResponse | null>(null);
    private loadingChangePassowrdSubject = new Subject<boolean>();
    loadingPass = this.loadingChangePassowrdSubject.asObservable();

    constructor(
        private userService: UserService,
        private toastService: ToastService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    get id$(): Observable<any> {
        return this._userInfo.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }
    get userInfo$(): Observable<IResponse> {
        return this._userInfo.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    userInfo() {
        return this.userService.userInfo().subscribe((res) => {
            this._userInfo.next(res);
        });
    }

    changePassword(changePassword: IChangePassword) {
        return this.userService.changePassword(changePassword).subscribe({
            next: (res) => {
                if (res) {
                    this.sessionService.logout();
                    this.router.navigate(['/auth/login']);
                    this.toastService.showSuccess(
                        'Thay đổi mật khẩu thành công'
                    );
                }
            },
            error: (err) => {
                if (err) {
                    this.toastService.showError(
                        'Hãy kiểm tra lại thông tin và thử lại'
                    );
                }
            },
        });
    }

    editUserProfile(userInfo: IUser) {
        return this.userService.editUserProfile(userInfo).subscribe({
            next: (res) => {
                if (res) {
                    this.userInfo();
                    this.toastService.showSuccess(
                        'Thay đổi thông tin thành công'
                    );
                }
            },
            error: (err) => {
                if (err) {
                    this.toastService.showError(
                        'Hãy kiểm tra lại thông tin và thử lại'
                    );
                }
            },
        });
    }
}
