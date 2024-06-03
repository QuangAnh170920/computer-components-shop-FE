import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResgisterComponent } from './components/form-resgister/form-resgister.component';

const routes: Routes = [
  {
    path: 'form-register',
    component: FormResgisterComponent
  },

];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
