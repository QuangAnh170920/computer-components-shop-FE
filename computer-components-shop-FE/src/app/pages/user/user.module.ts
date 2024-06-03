import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    UserInfoComponent,
    UserChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ButtonModule,
    PasswordModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule, 
    DialogModule,
  ]
})
export class UserModule { }
