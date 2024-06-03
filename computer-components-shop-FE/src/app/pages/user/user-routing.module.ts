import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';

const routes: Routes = [
  {path: 'user-info', component: UserInfoComponent},
  {path: 'user-change-password', component: UserChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
