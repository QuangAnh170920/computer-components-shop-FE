import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormResgisterComponent } from './components/form-resgister/form-resgister.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgxOtpInputModule } from 'ngx-otp-input';
@NgModule({
  declarations: [FormResgisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule, 
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule, 
    PasswordModule,
    DialogModule, 
    NgxOtpInputModule
  ]
})
export class RegisterModule { }
