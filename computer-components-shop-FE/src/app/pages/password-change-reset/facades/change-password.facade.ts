import { ToastService } from "@shared/services/toast.service";
import { ChangePasswordService } from "../services/change-password.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { DataSharingService } from "../services/data-sharing.service";
import { IChangePassword } from "../models/password.model";

@Injectable({
    providedIn: 'root',
})
export class ChangePasswordFacade {
    constructor(
        private changePasswordService: ChangePasswordService,
        private dataSharingService: DataSharingService,
        private toastService: ToastService,
        private router: Router) { }
    private loadingSubject = new Subject<boolean>();
    loading = this.loadingSubject.asObservable();
    private loadingChangePassowrdSubject = new Subject<boolean>();
    loadingPass = this.loadingChangePassowrdSubject.asObservable();
    sendOTP(identityContent: string) {
        return this.changePasswordService.sendOTP(identityContent).subscribe({
            next: (res) => {
               if(res.responseData){
                   this.dataSharingService.email = res.responseData;
                   this.loadingSubject.next(false);
                   this.router.navigate(['/password/change-password']); 
                   this.toastService.showSuccess('OTP gửi về email')
               }
            },
            error: (err) =>{
               if(err){
                this.loadingSubject.next(false);
               }
            }
        })
    }
    changePassword(changePassword: IChangePassword){
        return this.changePasswordService.changePassword(changePassword).subscribe({
            next: (res) => {
           
               if(res){
                   this.loadingChangePassowrdSubject.next(false);
                   this.router.navigate(['/auth/login']); 
                   this.toastService.showSuccess('Thay đổi mật khẩu thành công.Đăng nhập ngay')
               }
            },
            error: (err) =>{
               if(err){
                this.loadingChangePassowrdSubject.next(false);
               }
            }
        })
    }
}