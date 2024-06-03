import { Injectable } from '@angular/core';
import {  IChangePassword, IResponse, IUser } from '../models/user.model';
import {
    BehaviorSubject,
    Observable,
    Subject,
    distinctUntilChanged,
    filter,
} from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SessionService } from '../../../shared/services/session.service';

@Injectable({
    providedIn: 'root',
})
export class UserFacade {
    // private _id = new BehaviorSubject<any | null>(null);
    private _userInfo = new BehaviorSubject<IResponse | null>(null);
    private loadingChangePassowrdSubject = new Subject<boolean>();
    loadingPass = this.loadingChangePassowrdSubject.asObservable();

    constructor(
        private userService: UserService,
        private toastService: ToastService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    get userInfo$(): Observable<IResponse> {
        return this._userInfo.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    // userInfo() {
    //     return this.userService.userInfo().subscribe( {
    //         next: (res) => {
    //             if(res){
    //                 this.toastService.showSuccess('Hiển thị thông tin người dùng thành công!')
    //                 this._userInfo.next(res);
    //             }
    //         }, 
    //         error: (err) =>  {
    //             if(err){
    //                 this.toastService.showSuccess('Hiển thị thông tin người dùng không thành công!')
    //             }
    //         },
    //     });
    // }
    // changePassword(changePassword: IChangePassword) {
    //     return this.userService.changePassword(changePassword).subscribe({
    //         next: (res) => {
    //             if (res) {
    //                 console.log(res, "err");
    //                 this.loadingChangePassowrdSubject.next(false);
    //                 this.sessionService.logout();
    //                 this.router.navigate(['/auth/login']);
    //                 this.toastService.showSuccess(
    //                     'Thay đổi mật khẩu thành công'
    //                 );
    //             }
    //         },
    //         error: (err) => {
    //             if (err) {
    //                 console.log(err, "err");
    //                 this.loadingChangePassowrdSubject.next(false);
    //             }
    //         },
    //     });
    // }
   
}
