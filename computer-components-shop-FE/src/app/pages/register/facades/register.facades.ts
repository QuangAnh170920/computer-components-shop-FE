
import { IRegister, IResponse, IVerify } from "../models/register.model";
import { ToastService } from "@shared/services/toast.service";
import { Router } from "@angular/router";
import { RegisterService } from "../services/register.service";
import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Subject } from "rxjs";
@Injectable({
    providedIn: 'root',
})
export class RegisterFacade {
    
    constructor(
        private registerService: RegisterService,
        private toastService: ToastService,
        private router: Router) { }

    private visibleSubject = new Subject<boolean>();
    visible = this.visibleSubject.asObservable();
    private loadingSubject = new Subject<boolean>();
    loading = this.loadingSubject.asObservable();
    private loadingVerifySubject = new Subject<boolean>();
    loadingVerify = this.loadingVerifySubject.asObservable();
    register(register: IRegister) {
        return this.registerService.register(register).subscribe( {
            next: (res) => {
                if(res){
                    this.visibleSubject.next(true);
                    this.loadingSubject.next(false);
                    this.toastService.showSuccess('OTP gửi về email')
                }
            }, 
            error: (err) =>  {
                if(err){
                    this.visibleSubject.next(false);
                    this.loadingSubject.next(false);
                }
            },
          
        }) 
    }
    verify(email: string, otp: string) {

        return this.registerService.verify(email, otp).subscribe({
            next: (res) => {
                if(res){
                    this.loadingVerifySubject.next(false)
                    this.toastService.showSuccess('Đăng ký thành công')
                    this.router.navigate(['/auth']);
                }
            }, 
            error: (err) =>  {
                if(err){
                    this.loadingVerifySubject.next(false)
                }
            },
           
        })
    }
}