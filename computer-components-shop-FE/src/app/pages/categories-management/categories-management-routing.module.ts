import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesManagementComponent } from './components/categories-management/categories-management.component';

const routes: Routes = [
  {
      path: '',
      component: CategoriesManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesManagementRoutingModule { }
