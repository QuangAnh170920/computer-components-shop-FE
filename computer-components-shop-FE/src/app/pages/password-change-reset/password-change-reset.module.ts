import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordChangeResetRoutingModule } from './password-change-reset-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { VerifyComponent } from './components/verify/verify.component';
import { NgxOtpInputModule } from "ngx-otp-input";
import { ToastService } from '../../shared/services/toast.service';
@NgModule({
  declarations: [ChangePasswordComponent,SendOtpComponent, VerifyComponent ],
  imports: [
    CommonModule,
    PasswordChangeResetRoutingModule,
    ReactiveFormsModule, 
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    PaginatorModule,
    NgxOtpInputModule 
  ], 
  providers:[
    ToastService
  ]
})
export class PasswordChangeResetModule { }
