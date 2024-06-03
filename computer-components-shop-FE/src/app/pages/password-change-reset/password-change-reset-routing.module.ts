import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [

  {
    path:'send-otp',
    component: SendOtpComponent
  }, 
  {
    path:'change-password',
    component: ChangePasswordComponent
  }, 
  {
    path:'verify',
    component: VerifyComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordChangeResetRoutingModule { }
